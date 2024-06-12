import React from 'react';

import {useAccountValueSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {formatPercentFromFraction} from '@/utils/format/number/percent';


type Props = {
  quantity: number,
  marketValue: number,
};

export const PositionAccountPercentage = ({quantity, marketValue}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const accountValue = useAccountValueSelector(currentAccount, 'NetLiquidation');

  if (quantity === 0) {
    return <>-</>;
  }

  return (
    <>{formatPercentFromFraction({numerator: marketValue, denominator: accountValue})}</>
  );
};
