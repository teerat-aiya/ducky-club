import { Link, useLocation } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { UserProfile } from "~/contexts/LineLiffContext";
import { useTheme } from "~/hooks/useTheme";

interface HeaderProps {
  profile: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [selectedLink, setSelectedLink] = useState(location.pathname);

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  if (selectedLink === "/menu/profile") {
    return;
  }

  return (
    <>
      <header className={`sticky top-0 z-40 shadow-sm border-b ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-3 flex justify-between items-center">
          <div>
            {selectedLink === "/menu" && (
              <>
                <h1 className="text-xl sm:text-xl text-gray-800 font-bold">
                  <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                    Ducky Duck
                  </span>
                </h1>
              </>
            )}
            {selectedLink === "/menu/events" && (
              <>
                <h1 className="text-xl sm:text-2xl text-gray-800 font-bold">
                  <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                    Events
                  </span>
                </h1>
              </>
            )}
            {selectedLink === "/menu/community" && (
              <>
                <h1 className="text-xl sm:text-2xl text-gray-800 font-bold">
                  <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                    Community
                  </span>
                </h1>
              </>
            )}
            <h3 className="text-sm sm:text-base text-gray-800">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Welcome back, {profile?.displayName}
              </span>
            </h3>
          </div>
          <Link to="/menu/profile">
            <div className="relative">
              {profile?.pictureUrl ? (
                <img
className={`shrink-0 size-11 sm:size-14 ring-4 rounded-full ${
                    isDarkMode ? 'ring-gray-800' : 'ring-white'
                  }`}
                  src={profile.pictureUrl}
                  alt="Avatar"
                />
              ) : (
                <div className="shrink-0 size-11 sm:size-14 rounded-full bg-primary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user"
                  >
                    <path d="M18 20a6 6 0 0 0-12 0" />
                    <circle cx={12} cy={10} r={4} />
                    <circle cx={12} cy={12} r={10} />
                  </svg>
                </div>
              )}
            </div>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
