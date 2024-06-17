import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {formatFloat, formatInt} from '@/utils/format/number/regular';
import {Nullable} from '@/utils/type';


type Props = {
  completed: Nullable<number>,
  total: Nullable<number>,
  className?: string,
};

export const ProgressText = ({completed, total, className, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-1 whitespace-nowrap', className)}>
      {children}
      <span>{formatInt(completed)}</span>
      <span>/</span>
      <span>{formatInt(total)}</span>
      <span>({completed && total ? formatFloat(completed / total * 100) : '-'}%)</span>
    </Flex>
  );
};
