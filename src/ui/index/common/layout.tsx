import React from 'react';

import {clsx} from 'clsx';


type Props = {
  className?: string,
  fullHeight?: boolean,
};

export const WindowLayout = ({children, className, fullHeight = true}: React.PropsWithChildren<Props>) => {
  return (
    <div
      className={clsx(
        'flex rounded-lg bg-gradient-to-br from-violet-950 to-indigo-800 p-2',
        fullHeight ? 'h-full' : '',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const AutoOverflowWindowLayout = ({children, className}: React.PropsWithChildren<Props>) => {
  return (
    <WindowLayout className={className}>
      <div className="w-full overflow-auto">
        {children}
      </div>
    </WindowLayout>
  );
};
