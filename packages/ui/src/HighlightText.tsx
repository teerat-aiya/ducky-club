import React from 'react';
import * as  _ from 'lodash';

interface HighlightTextProps {
  text: string;
  highlight: string
}


export const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  if (!highlight?.trim()) return <span>{text}</span>;

  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi');
  const parts = text?.split(regex);

  return (
    <span>
      {parts?.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};
