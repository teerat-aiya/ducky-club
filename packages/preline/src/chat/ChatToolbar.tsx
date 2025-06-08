import React from 'react';
import { Plus } from 'lucide-react';
interface ChatToolbarProps {
  modalKey: string;
  onAddText?: () => void;
  onAddImage?: () => void;
}

export const ChatToolbar: React.FC<ChatToolbarProps> = ({ modalKey, onAddText, onAddImage }) => {
  return (
    <>
      <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-dropdown-hover-event"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
          type="button"
          className="flex justify-center items-center size-9 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none text-gray-800 rounded-full dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600"
        >
          <Plus className="size-5" />
        </button>
        <div
          className="hs-dropdown-menu cursor-pointer transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="hs-dropdown-hover-event"
        >
          <div
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={onAddText}
            role="menuitem"
            data-hs-overlay={`#hs-pro-create-text-message-modal-${modalKey}`}
          >
            Text
          </div>

          <div
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={onAddImage}
            role="menuitem"
          >
            Image
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatToolbar;