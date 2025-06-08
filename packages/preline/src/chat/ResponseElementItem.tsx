import React from 'react';
import { TextMessage } from './TextMessage';
import { ResponseElement, ResponseElementType } from '@repo/shared'
import { CardMessage } from './CardMessage';
// import ImageMessage from './ImageMessage';

interface ResponseElementProps {
  element: ResponseElement;
  onChanged?: (updatedElement: ResponseElement) => void;
}

const ResponseElementItem: React.FC<ResponseElementProps> = ({ element, onChanged }) => {
  switch (element.type) {
    case ResponseElementType.Text:
      return <TextMessage text={element.payload?.text} onChanged={(newText) => onChanged?.({ ...element, payload: { ...element.payload, text: newText } })} index={0} />;
    case ResponseElementType.CardMessage:
      return <CardMessage card={element.payload} onChanged={(newCard) => onChanged?.({ ...element, payload: newCard })} />;
    // case ResponseElementType.Image:
    //   return <ImageMessage image={element.payload} onChanged={(newImage) => onChanged?.({ ...element, payload: newImage })} />;
    // Add cases for other response types
    default:
      return <div>Unsupported response type: {element.type}</div>;
  }
};
export default ResponseElementItem;