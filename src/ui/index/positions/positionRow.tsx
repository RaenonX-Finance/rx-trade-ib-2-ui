import React from 'react';

import {clsx} from 'clsx';

import {askClassName, bidClassName, markPxClassName} from '@/components/colors/const';
import {TableRow} from '@/components/table/row';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {useContractSelector} from '@/state/contract/selector';
import {useFilledOrderSelector, useOpenOrderSelector} from '@/state/order/selector';
import {usePositionSelector} from '@/state/position/selector';
import {usePxSelector} from '@/state/px/selector';
import {ContractId} from '@/types/data/px';
import {PositionAccountPercentage} from '@/ui/index/positions/dataCell/accountPercent';
import {PositionDailyPnlPercent} from '@/ui/index/positions/dataCell/positionDailyPnlPercent';
import {PositionQuantity} from '@/ui/index/positions/dataCell/quantity';
import {PositionTotalPnlPercent} from '@/ui/index/positions/dataCell/totalPnlPercent';
import {PositionFilter} from '@/ui/index/positions/type';
import {getPnlTextClassName} from '@/ui/index/positions/utils';
import {isAllValueFalse} from '@/utils/record';


type Props = {
  contractId: ContractId,
  filter: PositionFilter,
};

export const PositionRow = ({contractId, filter}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const contract = useContractSelector(contractId);
  const px = usePxSelector(contractId);
  const openOrders = useOpenOrderSelector(currentAccount);
  const filledOrders = useFilledOrderSelector(currentAccount);
  const positionData = usePositionSelector(currentAccount, contract?.id);

  if (!positionData) {
    return null;
  }

  let {
    avgPx,
    costBasis,
    marketValue,
    quantity,
    dailyPnl,
    unrealizedPnl,
    realizedPnl,
  } = positionData;
  const {holding, exited} = filter;
  const showAll = isAllValueFalse(filter);

  if (!showAll && ((holding && quantity === 0) || (exited && quantity !== 0))) {
    return null;
  }

  let classOfRowBg = 'odd:bg-neutral-800/25 even:bg-neutral-900/50';
  if (unrealizedPnl) {
    if (unrealizedPnl > 0) {
      classOfRowBg = 'odd:bg-green-900/50 even:bg-green-950/50';
    } else if (unrealizedPnl < 0) {
      classOfRowBg = 'odd:bg-rose-900/50 even:bg-rose-950/50';
    }
  }

  const totalPnl = unrealizedPnl + realizedPnl;
  const hasOrder = Object.values(openOrders || {})
    .some((order) => order?.contract.id === contractId);
  const isTraded = Object.values(filledOrders || {})
    .some((order) => order?.contract.id === contractId);

  if (contract?.securityType === 'Futures') {
    const maintenanceMargin = contract.maintenanceMargin ?? NaN;

    // Margin at the price level of `avgPx` is unknown
    costBasis = NaN;
    marketValue = quantity * maintenanceMargin;
  }

  return (
    <TableRow className={clsx('text-right', classOfRowBg)}>
      <td className="whitespace-nowrap text-left">
        <code>{contract?.localSymbol || contractId}</code>
      </td>
      <td>
        {px?.Last?.toFixed(2) ?? '-'}
      </td>
      <td className={bidClassName}>
        {px?.Bid?.toFixed(2) ?? '-'}
      </td>
      <td className={askClassName}>
        {px?.Ask?.toFixed(2) ?? '-'}
      </td>
      <td className={markPxClassName}>
        {px?.Mark?.toFixed(2) ?? '-'}
      </td>
      <td>
        {px?.Delta?.toFixed(4) ?? '-'}
      </td>
      <td>
        <PositionQuantity quantity={quantity}/>
      </td>
      <td>
        {quantity === 0 ? '-' : avgPx.toFixed(3)}
      </td>
      <td>
        {quantity === 0 || isNaN(costBasis) ? '-' : costBasis.toFixed(2)}
      </td>
      <td>
        {quantity === 0 || isNaN(marketValue) ? '-' : marketValue.toFixed(2)}
      </td>
      <td>
        <PositionAccountPercentage quantity={quantity} marketValue={marketValue}/>
      </td>
      <td className={getPnlTextClassName(dailyPnl ?? 0)}>
        {dailyPnl?.toFixed(2) ?? '-'}
      </td>
      <td>
        <PositionDailyPnlPercent dailyPnl={dailyPnl}/>
      </td>
      <td className={getPnlTextClassName(totalPnl)}>
        {totalPnl.toFixed(2)}
      </td>
      <td>
        <PositionTotalPnlPercent
          contract={contract}
          quantity={quantity}
          costBasis={costBasis}
          marketValue={marketValue}
          totalPnl={totalPnl}
        />
      </td>
      <td className="text-center">
        {hasOrder ? '⬤' : ''}
      </td>
      <td className="text-center">
        {isTraded ? '⬤' : ''}
      </td>
    </TableRow>
  );
};
