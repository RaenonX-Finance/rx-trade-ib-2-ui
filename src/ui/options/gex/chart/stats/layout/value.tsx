import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {getMarketColorClassOfText} from '@/styles/color/text';
import {formatFloat} from '@/utils/format/number/regular';
import {formatSignedNumber} from '@/utils/format/number/signed';
import {Nullable} from '@/utils/type';


type Props = {
  value: Nullable<number>,
  spotPx: number,
};

export const OptionsGexStatsLayoutValue = ({value, spotPx}: Props) => {
  const diffPercent = value ? (value / spotPx - 1) * 100 : null;

  return (
    <Flex direction="row" noFullWidth className="items-end gap-0.5 leading-none">
      <span>{formatFloat(value)}</span>
      {
        diffPercent != null &&
        <span className={clsx('text-xs leading-none', getMarketColorClassOfText(diffPercent))}>
          {formatSignedNumber({num: diffPercent, sign: true})}%
        </span>
      }
    </Flex>
  );
};
