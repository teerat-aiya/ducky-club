import React, { useState, useCallback } from 'react';
import ToolDropdown from './ToolDropdown';
import TextMessageModal from './modal/TextMessageModal';

interface TextMessageProps {
  text: string;
  name?: string;
  index: number;
  onChanged?: (message: { text: string }, index: number) => void;
  onDuplicate?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export const TextMessage: React.FC<TextMessageProps> = ({ 
  name, 
  text, 
  index,
  onChanged, 
  onDuplicate, 
  onDelete 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleMessageChange = useCallback((message: { text: string }) => {
    onChanged?.(message, index);
    handleCloseModal();
  }, [onChanged, index]);

  const handleDelete = useCallback(() => {
    onDelete?.(index);
  }, [onDelete, index]);

  const handleDuplicate = useCallback(() => {
    onDuplicate?.(index);
  }, [onDuplicate, index]);

  return (
    <>
      {name && <p className="mb-1.5 ps-2.5 text-xs text-gray-400">{name}</p>}
      <div className="space-y-1">
        <div
          className="group flex justify-start gap-x-2"
          style={{ wordBreak: "break-word" }}
        >
          <div
            className="order-1 bg-white shadow-sm inline-block rounded-xl pt-2 pb-1.5 px-2.5 cursor-pointer"
            onClick={handleOpenModal}
          >
            <div className="text-sm text-gray-800">
              <FormatAnswer text={text} />
            </div>
          </div>
          <ToolDropdown
            index={index}
            onEditClick={handleOpenModal}
            onDuplicateClick={handleDuplicate}
            onDeleteClick={handleDelete}
          />
        </div>
      </div>
      <TextMessageModal
        text={text}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onChanged={handleMessageChange}
      />
    </>
  );
};

const FormatAnswer: React.FC<{ text: string }> = ({ text }) => {
  // Regular expression to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text into parts (alternating between regular text and URLs)
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      // If the part is a URL, wrap it in an anchor tag
      return (
        <a key={index} target='_blank' className="break-all text-blue-600 underline" href={part}>
          {part}
        </a>
      );
    } else {
      // If it's regular text, replace newlines with <br/> tags
      return (
        <span key={index} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br/>') }} />
      );
    }
  });
};
