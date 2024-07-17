import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {getMarketColorClassOfText} from '@/styles/color/text';
import {formatInt} from '@/utils/format/number/regular';


type Props = {
  amount: number,
  withColor?: boolean,
  className?: string,
};

export const Dollar = ({amount, withColor, className}: Props) => {
  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-end gap-1 leading-none',
      withColor && getMarketColorClassOfText(amount),
      className,
    )}>
      <span>$</span>
      <span>{formatInt(amount)}</span>
    </Flex>
  );
};
