import React from 'react';

import {TableRow} from '@/components/table/row';
import {
  useAccountDailyPnlSelector,
  useAccountTotalPnlSelector,
  useCurrentAccountSelector,
} from '@/state/account/selector';
import {AccountDailyPnlPercent} from '@/ui/index/positions/dataCell/accountDailyPnlPercent';
import {AccountTotalPnlPercent} from '@/ui/index/positions/dataCell/accountTotalPnlPercent';
import {AccountCashPercent} from '@/ui/index/positions/dataCell/cashPercent';
import {getPnlTextClassName} from '@/ui/index/positions/utils';


export const SummaryRow = () => {
  const currentAccount = useCurrentAccountSelector();
  const dailyPnl = useAccountTotalPnlSelector(currentAccount);
  const totalPnl = useAccountDailyPnlSelector(currentAccount);

  return (
    <TableRow className="bg-amber-900/75 text-right">
      <td className="whitespace-nowrap">Cash / PnL</td>
      <td/>
      <td/>
      <td/>
      <td/>
      <td/>
      <td/>
      <td/>
      <td/>
      <td/>
      <td><AccountCashPercent/></td>
      <td className={getPnlTextClassName(dailyPnl || 0)}>{dailyPnl?.toFixed(2)}</td>
      <td><AccountDailyPnlPercent/></td>
      <td className={getPnlTextClassName(totalPnl || 0)}>{totalPnl?.toFixed(2)}</td>
      <td><AccountTotalPnlPercent/></td>
      <td/>
      <td/>
    </TableRow>
  );
};
