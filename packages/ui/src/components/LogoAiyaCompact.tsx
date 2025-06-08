import React from 'react';

export const LogoAiyaCompact: React.FC<{
  className?: string
  width?: number;
  height?: number;
}> = ({ className = "w-28 h-auto", width = 90, height = 32 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 900 699"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M416 93h2l8 16 10 19 8 18 12 23 23 46 7 15 12 23 3 5 4 10 15 29 4 9 17 33 4 9 17 33 7 15 14 27 7 15 15 29 9 19 10 19 12 25 10 19 11 23 10 19 3 8h-96l-10-19-50-100-8-15-5-11-18-36-4-9-15-29-13-26-11-21-7-16-10-19-6-12-12 22-15 31-10 19-3 5-4 10-16 31-7 14-8 6-14 9-17 8-14 4-25 7-21 8-10 6-6 3-10 11-3 3 2-6 16-33 9-17 11-23 10-19 11-23 10-19 11-23 10-19 3-7 18-35 3-7 10-20 8-15 3-7 26-52 12-23 4-9 10-20z"
        fill="#226BAD"
      />
      <path
        d="M334 450l1 2-8 16-9 19-4 7-3 7-8 16-7 12-3 1-2 5-8 8-13 8-16 6-19 6-26 8-13 5-9 5-14 11-4 3-3-1 11-22 9-17 11-23 8-14 6-9 8-7 14-9 15-6 41-12 24-10 15-10z"
        fill="#226BAD"
      />
    </svg>
  );
};

export default LogoAiyaCompact;