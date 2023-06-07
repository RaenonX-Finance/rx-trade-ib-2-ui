import React from 'react';

import {useAccountDataSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {PnlPercent} from '@/ui/index/positions/dataCell/pnlPercent';


export const AccountTotalPnlPercent = () => {
  const currentAccount = useCurrentAccountSelector();
  const accountData = useAccountDataSelector(currentAccount);

  if (!accountData || !accountData.pnl) {
    return <></>;
  }

  const {unrealized, realized} = accountData.pnl;

  return <PnlPercent pnl={unrealized + realized}/>;
};
