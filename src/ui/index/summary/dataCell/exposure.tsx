import React from 'react';

import {useAccountValueSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {formatPercentFromFraction} from '@/utils/format/number/percent';


export const ExposurePercent = () => {
  const currentAccount = useCurrentAccountSelector();
  const availableFunds = useAccountValueSelector(currentAccount, 'AvailableFunds');
  const netLiquidation = useAccountValueSelector(currentAccount, 'NetLiquidation');

  if (!availableFunds || !netLiquidation) {
    return <>-</>;
  }

  const underwater = netLiquidation - availableFunds;

  return <>{formatPercentFromFraction({numerator: underwater, denominator: netLiquidation})}</>;
};
