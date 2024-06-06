import React from 'react';

import {useAccountDataSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {getPreviousDayValue} from '@/utils/calc/account';
import {formatPercent} from '@/utils/string';


type Props = {
  pnl: number | null,
};

export const PnlPercent = ({pnl}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const accountData = useAccountDataSelector(currentAccount);

  if (!accountData || pnl === null) {
    return <>-</>;
  }

  const previousDayValue = getPreviousDayValue(accountData);

  if (!previousDayValue) {
    return <>-</>;
  }

  return <>{formatPercent({numerator: pnl, denominator: previousDayValue})}</>;
};
