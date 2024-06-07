import React from 'react';

import {usePxSelector} from '@/state/px/selector';
import {ContractId} from '@/types/data/px';
import {getMidPx, getPxSpread} from '@/utils/calc/tick';
import {formatPercent} from '@/utils/format/number/percent';
import {formatFloat, formatFloat4} from '@/utils/format/number/regular';
import {formatSignedNumber} from '@/utils/format/number/signed';
import {getChange} from '@/utils/math';
import {isNotNullish} from '@/utils/type';


type Props = {
  contractId: ContractId,
};

export const OptionChainDataCells = ({contractId}: Props) => {
  const px = usePxSelector(contractId);

  const spread = getPxSpread(px);
  const base =
    getMidPx(px) ??
    (!!px?.Mark && px.Mark > 1E-3 ? px.Mark : undefined);
  const theta = px?.Theta ? Math.abs(px.Theta) : undefined;
  const changeInfo = getChange({original: px?.Close, after: base});

  return (
    <>
      <td className="whitespace-nowrap">
        {!isNotNullish(px?.Last) && isNotNullish(px?.Close) && 'c '}{formatFloat(px?.Last ?? px?.Close)}
      </td>
      <td className="text-px-bid">{formatFloat(px?.Bid)}</td>
      <td className="text-px-ask">{formatFloat(px?.Ask)}</td>
      <td className="text-px-mark">{formatFloat(px?.Mark)}</td>
      <td className={changeInfo?.textClass}>
        {formatSignedNumber({num: changeInfo?.changeAmt, digits: 2, sign: true})}
      </td>
      <td className={changeInfo?.textClass}>
        {formatSignedNumber({num: changeInfo?.changePct, digits: 2, sign: true})}
      </td>
      <td>{formatFloat4(px?.Delta)}</td>
      <td>{formatFloat4(px?.Theta)}</td>
      <td>
        {(!!base && !!theta && theta > 1E-5) ?
          formatPercent({numerator: Math.abs(theta), denominator: base}) :
          '-'}
      </td>
      <td>
        {(!!base && !!spread) ?
          formatPercent({numerator: spread, denominator: base}) :
          '-'}
      </td>
    </>
  );
};
