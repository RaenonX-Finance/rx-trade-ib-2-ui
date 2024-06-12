import React from 'react';

import {useAccountValueSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {formatPercentFromFraction} from '@/utils/format/number/percent';


type Props = {
  orderValue: number,
};

export const OrderNetLiqPercent = ({orderValue}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const netLiquidation = useAccountValueSelector(currentAccount, 'NetLiquidation');

  if (!netLiquidation) {
    return <>-</>;
  }

  return <>{formatPercentFromFraction({numerator: orderValue, denominator: netLiquidation})}</>;
};
