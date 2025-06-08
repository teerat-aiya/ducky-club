import React, { useEffect, useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  firstName?: string;
  lastName?: string;
  size?: number;
  className?: string;
}

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return '?';
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  firstName,
  lastName,
  size = 38,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const initials = getInitials(firstName, lastName);
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  const DefaultImage = () => <div className={`w-full h-full flex items-center justify-center text-white ${bgColor}`}>
    <span className="text-sm font-medium">{initials}</span>
  </div>

  if (src && src.includes("undefined")) {
    return <div></div>
  }

  return (
    <div
      className={`flex-shrink-0 rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || `${firstName} ${lastName}`}
          className={`w-full h-full object-cover`}
          onError={handleImageError}
        />
      ) : (
        <DefaultImage />
      )}
    </div>
  );
};


