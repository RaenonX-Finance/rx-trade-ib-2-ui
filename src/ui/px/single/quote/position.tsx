import React from 'react';

import {useCurrentAccountSelector} from '@/state/account/selector';
import {usePositionSelector} from '@/state/position/selector';
import {ContractInState} from '@/types/data/contract';
import {getPnlTextClassName} from '@/ui/index/positions/utils';
import {formatToDigits} from '@/utils/format/number/regular';
import {formatSignedNumber} from '@/utils/format/number/signed';
import {changeInfoToString, getChange} from '@/utils/math';


type Props = {
  contract: ContractInState | undefined,
};

export const QuotePositionStats = ({contract}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const position = usePositionSelector(currentAccount, contract?.id);

  if (!contract) {
    return <>-</>;
  }

  if (!position) {
    return <span className="text-gray-400">No Position</span>;
  }

  const digits = contract.digits;
  const {quantity, avgPx, costBasis, marketValue, realizedPnl} = position;

  if (quantity === 0) {
    return (
      <span className="text-gray-400">
        Exited /&nbsp;
        <span className={getPnlTextClassName(realizedPnl)}>
          {formatSignedNumber({num: realizedPnl, digits, sign: true})}
        </span>
      </span>
    );
  }

  const change = getChange({
    original: costBasis,
    after: marketValue,
  });
  return (
    <>
      {quantity} x {formatToDigits({num: avgPx, digits})} /&nbsp;
      <span className={change?.textClass}>{changeInfoToString(change, digits)}</span>
    </>
  );
};
