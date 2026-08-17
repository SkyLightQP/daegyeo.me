import React, { HTMLAttributes } from 'react';

const StackBlock = ({ className, title, children }: HTMLAttributes<HTMLDivElement> & { title: string }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-3">
        <p className="text-gray-700">{children}</p>
      </div>
    </div>
  );
};

export default StackBlock;
