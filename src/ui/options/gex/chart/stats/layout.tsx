import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {getMarketColorClassOfText} from '@/styles/color/text';
import {formatFloat} from '@/utils/format/number/regular';
import {formatSignedNumber} from '@/utils/format/number/signed';
import {Nullable} from '@/utils/type';


type Props = {
  name: string,
  value: Nullable<number>,
  spotPx: number,
  className?: string,
};

export const OptionsGexStatsLayout = ({name, value, spotPx, className}: Props) => {
  const diffPercent = value ? (value / spotPx - 1) * 100 : null;

  return (
    <Flex direction="row" className={clsx('items-end justify-center gap-1', className)}>
      <span className="text-xs leading-none">{name}</span>
      <span>{formatFloat(value)}</span>
      {
        diffPercent != null &&
        <span className={getMarketColorClassOfText(diffPercent)}>
          {formatSignedNumber({num: diffPercent, sign: true})}%
        </span>
      }
    </Flex>
  );
};
