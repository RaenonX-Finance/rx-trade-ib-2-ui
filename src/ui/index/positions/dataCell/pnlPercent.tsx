import React from 'react';

import {useAccountDataSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {getPreviousDayValue} from '@/utils/calc/account';
import {formatPercentFromFraction} from '@/utils/format/number/percent';


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

  return <>{formatPercentFromFraction({numerator: pnl, denominator: previousDayValue})}</>;
};
