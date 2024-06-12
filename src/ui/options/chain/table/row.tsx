import React from 'react';

import {clsx} from 'clsx';

import {ContractId} from '@/types/data/px';
import {useOptionChainDataOfContract} from '@/ui/options/chain/table/calc/hook';
import {getDeltaTextStyle} from '@/ui/options/chain/table/style';
import {formatPercent} from '@/utils/format/number/percent';
import {formatFloat, formatFloat4} from '@/utils/format/number/regular';
import {formatSignedNumber} from '@/utils/format/number/signed';


type Props = {
  contractId: ContractId,
};

export const OptionChainDataCells = ({contractId}: Props) => {
  const {
    optionsPx,
    last,
    changeInfo,
    dailyLossPercent,
    timeNeutralMovementPercent,
    spreadPercent,
  } = useOptionChainDataOfContract(contractId);

  return (
    <>
      <td className="whitespace-nowrap">{last.isClose && 'c '}{formatFloat(last.px)}</td>
      <td className="text-px-bid">{formatFloat(optionsPx?.Bid)}</td>
      <td className="text-px-ask">{formatFloat(optionsPx?.Ask)}</td>
      <td className="text-px-mark">{formatFloat(optionsPx?.Mark)}</td>
      <td className={changeInfo?.textClass}>
        {formatSignedNumber({num: changeInfo?.changeAmt, sign: true})}
      </td>
      <td className={changeInfo?.textClass}>
        {formatSignedNumber({num: changeInfo?.changePct, sign: true})}
      </td>
      <td className={clsx(getDeltaTextStyle(optionsPx?.Delta))}>
        {formatFloat4(optionsPx?.Delta)}
      </td>
      <td>
        {formatPercent({percent: dailyLossPercent})}
      </td>
      <td>
        {formatSignedNumber({num: timeNeutralMovementPercent})}%
      </td>
      <td>
        {formatPercent({percent: spreadPercent})}
      </td>
    </>
  );
};
