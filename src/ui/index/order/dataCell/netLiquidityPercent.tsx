import React from 'react';

import {useAccountValueSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {formatPercent} from '@/utils/string';


type Props = {
  orderValue: number
};

export const OrderNetLiqPercent = ({orderValue}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const netLiquidation = useAccountValueSelector(currentAccount, 'NetLiquidation');

  if (!netLiquidation) {
    return <>-</>;
  }

  return <>{formatPercent({numerator: orderValue, denominator: netLiquidation})}</>;
};
