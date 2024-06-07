import React from 'react';

import {useCurrentAccountSelector} from '@/state/account/selector';
import {usePositionSelector} from '@/state/position/selector';
import {ContractInState} from '@/types/data/contract';
import {Order} from '@/types/data/order';
import {getPnlTextClassName} from '@/ui/index/positions/utils';
import {formatFloat} from '@/utils/format/number/regular';


type Props = {
  contract: ContractInState | undefined,
  order: Order,
  orderValue: number,
};

export const OrderExpectedPnL = ({contract, order, orderValue}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const position = usePositionSelector(currentAccount, contract?.id);

  if (!position || !contract) {
    return <>-</>;
  }

  const {multiplier, securityType} = contract;
  const {avgPx, quantity} = position;
  const {targetQuantity, price} = order;

  // Order price of 0 is likely market or other types of transaction which is not necessarily a trade
  // Avg Px of 0 is likely a position that has been exited
  if (price === 0 || avgPx === 0) {
    return <>-</>;
  }

  let expectedPnl;
  if (securityType === 'Options') {
    expectedPnl = orderValue - (avgPx * targetQuantity * multiplier);
  } else if (securityType === 'Futures') {
    expectedPnl = (price - avgPx) * targetQuantity * Math.sign(quantity) * multiplier;
  } else {
    throw new Error(`SecurityType: Unhandled expected PnL for security type: ${securityType}`);
  }

  return <span className={getPnlTextClassName(expectedPnl)}>{formatFloat(expectedPnl)}</span>;
};
