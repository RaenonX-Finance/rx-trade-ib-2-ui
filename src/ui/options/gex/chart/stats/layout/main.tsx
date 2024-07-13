import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {OptionsGexStatsLayoutValue} from '@/ui/options/gex/chart/stats/layout/value';
import {Nullable} from '@/utils/type';


type Props = {
  name: string,
  values: Nullable<number>[],
  spotPx: number,
  className?: string,
};

export const OptionsGexStatsLayout = ({name, values, spotPx, className}: Props) => {
  return (
    <Flex direction="row" center className={clsx('gap-2 whitespace-nowrap', className)}>
      <span className="text-xs leading-none">{name}</span>
      <Flex direction="row" wrap center noFullWidth className="items-end gap-2.5">
        {values.map((value, idx) => (
          <OptionsGexStatsLayoutValue key={`${spotPx}-${idx}`} spotPx={spotPx} value={value}/>
        ))}
      </Flex>
    </Flex>
  );
};
