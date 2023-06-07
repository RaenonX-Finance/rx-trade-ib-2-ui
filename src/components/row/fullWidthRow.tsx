import React from 'react';


type Props = {
  className?: string,
};

export const FullWidthRow = ({className, children}: React.PropsWithChildren<Props>) => {
  return (
    <div className={`flex w-full flex-row gap-2 ${className || ''}`}>
      {children}
    </div>
  );
};
