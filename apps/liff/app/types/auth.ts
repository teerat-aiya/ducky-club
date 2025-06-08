export type SignInCredential = {
  IDToken: string;
};


export type SignOut = {
  refreshToken: string | null;
};

export interface AuthResponse {
  accessToken: string | null;
  refreshToken: string | null;
  expires: number | null;
  expiresAt: number | null;
}

export interface UserProfile {
  emailNotifications?: boolean;
  description?: any;
  tags?: any;
  authData?: any;
  themeLightOverrides?: any;
  themeDarkOverrides?: any;
  themeLight?: any;
  themeDark?: any;
  appearance?: any;
  externalIdentifier?: any;
  provider?: string;
  lastPage?: string;
  token?: string;
  status?: string;
  tfaSecret?: any;
  language?: any;
  title?: any;
  location?: any;
  password?: string;
  email?: string;
  lastName?: string;
  firstName?: string;
  lastAccess?: string;
  role?: string;
  id?: string;
  avatar?: any;
  contacts?: any[];
}

export type SignInResponse = {
  auth: AuthResponse;
  // user: {
  //     username: string
  //     authority: string[]
  //     avatar: string
  //     email: string
  // }
  user: UserProfile;
};

export type SignUpResponse = SignInResponse;

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  password: string;
};

export interface SignUpCredential {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
}

export interface AuthState {
  token: string | null;
  refreshToken?: string | null;
  expiresAt?: string | number | null;
  isAuthenticated?: boolean;
}
