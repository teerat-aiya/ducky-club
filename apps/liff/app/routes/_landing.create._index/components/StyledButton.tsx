import React from "react";

interface StyledButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
  }

const StyledButton: React.FC<StyledButtonProps> =  ({ text, onClick, className }) => {
  return (
    <button
      className={`w-full py-3 text-lg font-bold rounded-lg transition ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default StyledButton;
