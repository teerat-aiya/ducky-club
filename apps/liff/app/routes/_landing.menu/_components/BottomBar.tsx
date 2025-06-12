import { useLocation, useNavigate } from "@remix-run/react";
import { bottombarLinks } from "./BottombarConfig";
import { useEffect, useState } from "react";
import { useTheme } from "~/hooks/useTheme";

interface BottomBarProps {}

const BottomBar: React.FC<BottomBarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedLink, setSelectedLink] = useState(location.pathname);

  const handleClick = (link: string) => {
    setSelectedLink(link);
    navigate(link);
  };

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  const { isDarkMode } = useTheme();

  return (
    <div className={`max-w-md fixed rounded-full mx-auto mb-7 inset-x-0 bottom-0 duration-300 overflow-hidden z-40 w-11/12 h-16 sm:h-20
      ${isDarkMode 
        ? 'bg-gray-800 border-gray-700 shadow-lg hover:shadow-gray-700/50' 
        : 'bg-white border-gray-200 shadow-md hover:shadow-gray-400/30'
      } border`}
    >
      <div className="flex justify-around w-full h-full">
        {bottombarLinks.map((link) => (
          <div key={link.to} className="hs-accordion h-full" id={link.label}>
            <button
              type="button"
              className={`flex flex-col justify-center items-center h-full w-full text-center p-3 text-sm sm:text-lg cursor-pointer duration-200 ${
                selectedLink === link.to 
                  ? "text-primary" 
                  : isDarkMode 
                    ? "text-gray-300" 
                    : "text-gray-800"
              }`}
              onClick={() => handleClick(link.to)}
            >
              <svg
                className="flex-shrink-0 mt-0.5 size-5 sm:size-8"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                {link.icon}
              </svg>

              {link.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
