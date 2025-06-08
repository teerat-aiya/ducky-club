import React, { useState, useEffect, useRef } from 'react';

interface CreateTextMessageModalProps {
  modalId?: string;
  text?: string;
  onChanged?: (message: { text: string }) => void;
  maxLength?: number;
}

export const CreateTextMessageModal: React.FC<CreateTextMessageModalProps> = ({ modalId='hs-pro-create-text-message-modal', onChanged, text, maxLength = 1000 }) => {
  const [input, setInput] = useState({
    text: text || "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, maxLength);
    setInput({ text: newText });
    setIsDirty(newText !== text);
  };

  const onOk = async () => {
    if (input.text.trim() === '' || input.text === text) return;
    const newMessage = { text: input.text.replace("#### ", "").trim() };
    onChanged?.(newMessage);
    setIsDirty(false);
    setInput({ text: '' });
  };

  const handleCancel = () => {
    // if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
    //   return;
    // }
    setInput({ text: '' });
    setIsDirty(false);
  };

  return (
    <div
      id={modalId}
      className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]">
          <div className="py-3 px-4 flex justify-between items-center border-b">
            <h3 className="font-semibold text-gray-800">Create Message</h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-overlay={`#${modalId}`}
              onClick={handleCancel}
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onOk(); }}>
            <div className="p-4">
              <textarea
                ref={textareaRef}
                id="hs-pro-message-text"
                className="px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                rows={12}
                placeholder="Type your message here..."
                value={input.text}
                onChange={handleInputChange}
                maxLength={maxLength}
              />
              <div className="mt-2 text-sm text-gray-500 text-right">
                {input.text.length} / {maxLength}
              </div>
            </div>
            <div className="p-4 flex justify-end gap-x-2">
              <div className="w-full flex justify-end items-center gap-x-2">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex justify-center items-center text-start bg-white border border-gray-200 text-gray-800 text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-overlay={`#${modalId}`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  data-hs-overlay={`#${modalId}`}
                  disabled={input.text.trim() === ''}
                  type="button"
                  onClick={onOk}
                  className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-blue-300"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTextMessageModal;