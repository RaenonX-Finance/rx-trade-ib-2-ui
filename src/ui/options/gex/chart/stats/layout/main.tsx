import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {OptionsGexStatsLayoutValue} from '@/ui/options/gex/chart/stats/layout/value';
import {Nullable} from '@/utils/type';


type Props = {
  name: string,
  values: Nullable<number>[],
  spotPx: number,
  // `idx` is the index of the in between item, starting from 0
  renderInBetweenItem?: (prev: Nullable<number>, next: Nullable<number>, idx: number) => React.ReactNode,
  className?: string,
};

export const OptionsGexStatsLayout = ({name, values, spotPx, renderInBetweenItem, className}: Props) => {
  if (!values.length) {
    values = [null];
  }

  return (
    <Flex direction="row" center className={clsx('gap-2 whitespace-nowrap', className)}>
      <span className="text-xs leading-none">{name}</span>
      <Flex direction="row" wrap center noFullWidth className="items-end gap-1">
        {renderInBetweenItem && !!values.length && renderInBetweenItem(null, values[0], 0)}
        {values.map((value, idx) => (
          <>
            <OptionsGexStatsLayoutValue key={`${spotPx}-${idx}`} spotPx={spotPx} value={value}/>
            {renderInBetweenItem && !!values.length && renderInBetweenItem(values[idx], values.at(idx + 1), idx + 1)}
          </>
        ))}
      </Flex>
    </Flex>
  );
};
