import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TextMessageModalProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onChanged: (message: { text: string }) => void;
  maxLength?: number;
}

export const TextMessageModal: React.FC<TextMessageModalProps> = ({
  text,
  isOpen,
  onClose,
  onChanged,
  maxLength = 1000
}) => {
  const [input, setInput] = useState(text);
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInput(text);
      setIsDirty(false);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [isOpen, text]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, maxLength);
    setInput(newText);
    setIsDirty(newText !== text);
  }, [maxLength, text]);

  const handleSave = useCallback(() => {
    if (input.trim() !== '' && isDirty) {
      onChanged({ text: input });
    } else {
      onClose();
    }
  }, [input, isDirty, onChanged, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id={`hs-pro-edit-text-message-modal`}
      className="hs-overlay w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-100 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="w-full max-h-full flex flex-col bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]">
          <div className="py-3 px-4 flex justify-between items-center border-b">
            <h3 className="font-semibold text-gray-800">{text ? "Edit" : "Create"} Message</h3>
            <button
              type="button"
              className="flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="p-4">
              <textarea
                ref={textareaRef}
                id="hs-pro-message-text"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                rows={12}
                placeholder="Type your message here..."
                value={input}
                onChange={handleInputChange}
                maxLength={maxLength}
              />
              <div className="mt-2 text-sm text-gray-500 text-right">
                {input.length} / {maxLength}
              </div>
            </div>
            <div className="p-4 flex justify-end gap-x-2">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextMessageModal;