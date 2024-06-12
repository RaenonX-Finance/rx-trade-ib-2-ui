import React from 'react';

import {useAccountValueSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {formatPercentFromFraction} from '@/utils/format/number/percent';


export const AccountCashPercent = () => {
  const currentAccount = useCurrentAccountSelector();
  const balance = useAccountValueSelector(currentAccount, 'AvailableFunds');
  const accountValue = useAccountValueSelector(currentAccount, 'NetLiquidation');

  return (
    <>{formatPercentFromFraction({numerator: balance, denominator: accountValue})}</>
  );
};
