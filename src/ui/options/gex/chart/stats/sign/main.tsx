import React from 'react';

import {clsx} from 'clsx';

import {OptionsGexSignIconContent} from '@/ui/options/gex/chart/stats/sign/content';
import {OptionsGexSignIconCommonProps} from '@/ui/options/gex/chart/stats/sign/type';


type Props = OptionsGexSignIconCommonProps & {
  idx: number,
};

export const OptionsGexSignIcon = ({idx, ...opts}: Props) => {
  const isNegative = idx % 2 === 0;

  return (
    <div className={clsx('size-6', isNegative ? 'text-red-500' : 'text-green-500')}>
      <OptionsGexSignIconContent isNegative={isNegative} {...opts}/>
    </div>
  );
};
