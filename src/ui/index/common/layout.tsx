import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  className?: string,
  fullHeight?: boolean,
};

export const WindowLayout = ({children, className, fullHeight = true}: React.PropsWithChildren<Props>) => {
  return (
    <Flex
      className={clsx(
        'rounded-lg bg-slate-500/10 p-2',
        fullHeight && 'h-full',
        className,
      )}
    >
      {children}
    </Flex>
  );
};
