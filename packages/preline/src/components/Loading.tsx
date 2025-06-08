import React from 'react';

interface LoadingProps {

}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5 h-full w-full">
      <div className="flex justify-center">
        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};
