import React from 'react';

import {ContractInState} from '@/types/data/contract';


type Props = {
  contract: ContractInState | undefined,
  quantity: number,
  costBasis: number,
  marketValue: number,
  totalPnl: number,
};

export const PositionTotalPnlPercent = ({contract, quantity, costBasis, marketValue, totalPnl}: Props) => {
  if (quantity === 0 || !contract) {
    return <>-</>;
  }

  const {securityType} = contract;

  let totalPnlPercent;
  if (securityType === 'Options') {
    // Needs to x sign so the credit leg of options reflect the correct %
    totalPnlPercent = (marketValue / costBasis - 1) * (Math.sign(costBasis));
  } else if (securityType === 'Futures') {
    totalPnlPercent = totalPnl / (marketValue - totalPnl);
  } else {
    throw new Error(`SecurityType: Unhandled security type ${securityType} to calculated total PnL %`);
  }

  return <>{(totalPnlPercent * 100).toFixed(2)}%</>;
};
