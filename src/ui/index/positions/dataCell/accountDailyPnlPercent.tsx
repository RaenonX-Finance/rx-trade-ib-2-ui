import React from 'react';

import {useAccountDailyPnlSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {PnlPercent} from '@/ui/index/positions/dataCell/pnlPercent';


export const AccountDailyPnlPercent = () => {
  const currentAccount = useCurrentAccountSelector();
  const dailyPnl = useAccountDailyPnlSelector(currentAccount);

  if (!dailyPnl) {
    return null;
  }

  return <PnlPercent pnl={dailyPnl}/>;
};
