import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {getMarketColorClassOfNumber} from '@/styles/color';
import {formatInt} from '@/utils/format/number/regular';


type Props = {
  amount: number,
  withColor?: boolean,
};

export const Dollar = ({amount, withColor}: Props) => {
  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-end gap-1 leading-none',
      withColor && getMarketColorClassOfNumber(amount),
    )}>
      <small>$</small>
      <span>{formatInt(amount)}</span>
    </Flex>
  );
};
