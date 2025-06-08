import { useState } from "react";

interface NumericScrollerProps {
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  unlimited?: boolean;
}

export default function NumericScroller({
  value,
  onChange,
  min = 1,
  max = 100,
  unlimited = true,
}: NumericScrollerProps) {
  const [isScrolling, setIsScrolling] = useState(false);

  // Helper to generate array of numbers for scrolling
  const generateNumbers = () => {
    const numbers = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const handleClick = () => {
    setIsScrolling(!isScrolling);
  };

  const selectNumber = (num: number | null) => {
    onChange(num);
    setIsScrolling(false);
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="cursor-pointer flex items-center space-x-1"
      >
        <span className="text-gray-600">
          {value === null ? "ไม่จำกัด" : value}
        </span>
        <span className="text-xs text-gray-400">▼</span>
      </div>

      {isScrolling && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg border border-gray-200 max-h-48 overflow-y-auto z-10 w-32">
          {unlimited && (
            <div
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                value === null ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => selectNumber(null)}
            >
              ไม่จำกัด
            </div>
          )}
          {generateNumbers().map((num) => (
            <div
              key={num}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                value === num ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => selectNumber(num)}
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
