import React, { useRef, useEffect } from 'react';

interface ToolDropdownProps {
  index: number;
  onEditClick?: (index: number) => void;
  onDuplicateClick?: (index: number) => void;
  onDeleteClick?: (index: number) => void;
}

const ToolDropdown: React.FC<ToolDropdownProps> = ({ index, onDeleteClick, onDuplicateClick, onEditClick }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (action: (index: number) => void | undefined) => {
    action(index);
    // Close the dropdown after action
    if (dropdownRef.current) {
      const dropdown = dropdownRef.current.querySelector('[data-hs-dropdown]');
      if (dropdown) {
        (dropdown as any).click(); // Trigger a click to close the dropdown
      }
    }
  };

  return (
    <div ref={dropdownRef} className="order-2 lg:opacity-0 lg:group-hover:opacity-100">
      <div className="hs-dropdown z-100 [--strategy:absolute] [--auto-close:inside] relative inline-flex">
        <button
          id={`hs-dropdown-${index}`}
          type="button"
          className="flex justify-center items-center gap-x-3 size-8 text-sm text-gray-600 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-200"
          data-hs-dropdown={`#hs-dropdown-menu-${index}`}
        >
          <svg
            className="shrink-0 size-4 rounded-full"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={1} />
            <circle cx={12} cy={5} r={1} />
            <circle cx={12} cy={19} r={1} />
          </svg>
        </button>
        <div
          id={`hs-dropdown-menu-${index}`}
          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
          aria-labelledby={`hs-dropdown-${index}`}
        >
          <div className="p-1 cursor-pointer">
            <div
              className="flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-xs text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              onClick={() => handleOptionClick(onEditClick || (() => {}))}
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              Edit
            </div>
            <div
              className="flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-xs text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              onClick={() => handleOptionClick(onDuplicateClick || (() => {}))}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 size-3.5"
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
              Duplicate
            </div>
            <div
              className="flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-xs text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              onClick={() => handleOptionClick(onDeleteClick || (() => {}))}
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1={10} x2={10} y1={11} y2={17} />
                <line x1={14} x2={14} y1={11} y2={17} />
              </svg>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDropdown;