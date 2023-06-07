import React from 'react';

import {useAccountValueSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {formatPercent} from '@/utils/string';


export const AccountCashPercent = () => {
  const currentAccount = useCurrentAccountSelector();
  const balance = useAccountValueSelector(currentAccount, 'AvailableFunds');
  const accountValue = useAccountValueSelector(currentAccount, 'NetLiquidation');

  return (
    <>{formatPercent({numerator: balance, denominator: accountValue})}</>
  );
};
