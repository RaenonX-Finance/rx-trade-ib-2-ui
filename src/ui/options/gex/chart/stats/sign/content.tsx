import React from 'react';

import MinusCircleIconOutline from '@heroicons/react/24/outline/MinusCircleIcon';
import PlusCircleIconOutline from '@heroicons/react/24/outline/PlusCircleIcon';
import MinusCircleIconSolid from '@heroicons/react/24/solid/MinusCircleIcon';
import PlusCircleIconSolid from '@heroicons/react/24/solid/PlusCircleIcon';

import {OptionsGexSignIconCommonProps} from '@/ui/options/gex/chart/stats/sign/type';
import {isCurrentPxInRange} from '@/ui/options/gex/chart/stats/sign/utils';


type Props = OptionsGexSignIconCommonProps & {
  isNegative: boolean,
};

export const OptionsGexSignIconContent = ({isNegative, ...opts}: Props) => {
  const inRange = isCurrentPxInRange(opts);

  if (isNegative) {
    return inRange ? <MinusCircleIconSolid/> : <MinusCircleIconOutline/>;
  }

  return inRange ? <PlusCircleIconSolid/> : <PlusCircleIconOutline/>;
};
