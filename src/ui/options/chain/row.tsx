import React from 'react';

import {askClassName, bidClassName, markPxClassName} from '@/components/colors/const';
import {usePxSelector} from '@/state/px/selector';
import {ContractId} from '@/types/data/px';
import {getMidPx, getPxSpread} from '@/utils/calc/tick';
import {getChange} from '@/utils/math';
import {formatNumber, formatPercent} from '@/utils/string';


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
        {px?.Last?.toFixed(2) ?? `c ${px?.Close?.toFixed(2)}` ?? '-'}
      </td>
      <td className={bidClassName}>{px?.Bid?.toFixed(2) ?? '-'}</td>
      <td className={askClassName}>{px?.Ask?.toFixed(2) ?? '-'}</td>
      <td className={markPxClassName}>{px?.Mark?.toFixed(2) ?? '-'}</td>
      <td className={changeInfo?.textClass}>
        {formatNumber({num: changeInfo?.changeAmt, digits: 2, sign: true})}
      </td>
      <td className={changeInfo?.textClass}>
        {formatNumber({num: changeInfo?.changePct, digits: 2, sign: true})}
      </td>
      <td>{px?.Delta?.toFixed(4) ?? '-'}</td>
      <td>{px?.Theta?.toFixed(4) ?? '-'}</td>
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
