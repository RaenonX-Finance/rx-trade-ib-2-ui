import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {formatFloat} from '@/utils/format/number/regular';
import {Nullable} from '@/utils/type';


type Props = {
  name: string,
  value: Nullable<number>,
};

export const OptionsGexStatsLayout = ({name, value}: Props) => {
  return (
    <Flex direction="row" className="items-end justify-center gap-1">
      <span className="text-xs leading-none">{name}</span>
      <span>{formatFloat(value ?? 5000)}</span>
    </Flex>
  );
};
