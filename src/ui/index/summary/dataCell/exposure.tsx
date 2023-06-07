import React from 'react';

import {useAccountValueSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {formatPercent} from '@/utils/string';


export const ExposurePercent = () => {
  const currentAccount = useCurrentAccountSelector();
  const availableFunds = useAccountValueSelector(currentAccount, 'AvailableFunds');
  const netLiquidation = useAccountValueSelector(currentAccount, 'NetLiquidation');

  if (!availableFunds || !netLiquidation) {
    return <>-</>;
  }

  const underwater = netLiquidation - availableFunds;

  return <>{formatPercent({numerator: underwater, denominator: netLiquidation})}</>;
};
