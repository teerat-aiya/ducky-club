import React, { createContext, useContext, useEffect, useState } from 'react';
import liff from '@line/liff';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// Types
interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  email?: string;
  statusMessage?: string;
}

interface LineLiffLoginOptions {
  redirectUri?: string;
}
interface LineLiffContextType {
  liff: typeof liff | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  profileQuery: UseQueryResult<UserProfile, Error>;
  error: Error | null;
  login: (agrs?: LineLiffLoginOptions) => Promise<void>;
  logout: () => Promise<void>;
  initializeError: Error | null;
}

const LineLiffContext = createContext<LineLiffContextType | null>(null);

interface LineLiffProviderProps {
  liffId: string;
  children: React.ReactNode;
}

export const LineLiffProvider: React.FC<LineLiffProviderProps> = ({ liffId, children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [initializeError, setInitializeError] = useState<Error | null>(null);

  // Initialize LIFF
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId }).then(() => {
          console.log('LIFF initialized', liffId);
        });
        setIsInitialized(true);
        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
        } else {
          console.log('User is not logged in');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize LIFF');
        setInitializeError(error);
        console.error('LIFF initialization failed:', error);
      }
    };

    initializeLiff();

    // Cleanup function
    return () => {
      setIsInitialized(false);
      setIsLoggedIn(false);
      setError(null);
      setInitializeError(null);
    };
  }, [liffId]);

  // Profile Query
  const profileQuery = useQuery<UserProfile, Error>({
    queryKey: ['lineProfile', isLoggedIn],
    queryFn: async () => {
      if (!isInitialized) {
        throw new Error('LIFF is not initialized');
      }
      if (!isLoggedIn) {
        throw new Error('User is not logged in');
      }

      try {
        const profile = await liff.getProfile();
        const decodedIdToken = liff.getDecodedIDToken();

        return {
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          statusMessage: profile.statusMessage,
          email: decodedIdToken?.email,
        };
      } catch (err) {
        throw err instanceof Error ? err : new Error('Failed to fetch profile');
      }
    },
    enabled: isInitialized && isLoggedIn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Only retry network-related errors, not auth errors
      if (error.message.includes('not logged in') || error.message.includes('not initialized')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const login = async ({ redirectUri }: LineLiffLoginOptions) => {
    try {
      if (!isInitialized) {
        throw new Error('LIFF is not initialized');
      }
      if (!liff.isLoggedIn()) {
        await liff.login({ redirectUri });
        setIsLoggedIn(true);
        await profileQuery.refetch();
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to login');
      setError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!isInitialized) {
        throw new Error('LIFF is not initialized');
      }
      if (liff.isLoggedIn()) {
        await liff.logout();
        setIsLoggedIn(false);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to logout');
      setError(error);
      throw error;
    }
  };

  const value: LineLiffContextType = {
    liff,
    isLoggedIn,
    isInitialized,
    profileQuery,
    error,
    initializeError,
    login,
    logout,
  };

  return (
    <LineLiffContext.Provider value={value}>
      {children}
    </LineLiffContext.Provider>
  );
};

export const useLineLiff = () => {
  const context = useContext(LineLiffContext);
  if (!context) {
    throw new Error('useLineLiff must be used within a LineLiffProvider');
  }
  return context;
};

// Custom hook for profile data
export const useLineProfile = () => {
  const { profileQuery, isInitialized, isLoggedIn } = useLineLiff();

  if (!isInitialized) {
    throw new Error('LIFF is not initialized');
  }

  if (!isLoggedIn) {
    throw new Error('User is not logged in');
  }

  return profileQuery;
};

// Custom hook for initialization status
export const useLineLiffInit = () => {
  const { isInitialized, initializeError } = useLineLiff();
  return { isInitialized, initializeError };
};