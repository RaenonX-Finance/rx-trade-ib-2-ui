import React from 'react';

import {askClassName, bidClassName, markPxClassName} from '@/components/colors/const';
import {usePxSelector} from '@/state/px/selector';
import {ContractId} from '@/types/data/px';
import {formatPercent} from '@/utils/string';


type Props = {
  contractId: ContractId
};

export const OptionChainDataCells = ({contractId}: Props) => {
  const px = usePxSelector(contractId);

  const bid = px?.Bid;
  const ask = px?.Ask;
  const hasBidAndAsk = !!bid && !!ask;
  const spread = hasBidAndAsk ? Math.abs(bid - ask) : undefined;
  const base = hasBidAndAsk ?
    (bid + ask) / 2 :
    (!!px?.Mark && px.Mark > 1E-3 ? px.Mark : undefined);
  const theta = px?.Theta ? Math.abs(px.Theta) : undefined;

  return (
    <>
      <td>{px?.Last?.toFixed(2) ?? '-'}</td>
      <td className={bidClassName}>{px?.Bid?.toFixed(2) ?? '-'}</td>
      <td className={askClassName}>{px?.Ask?.toFixed(2) ?? '-'}</td>
      <td className={markPxClassName}>{px?.Mark?.toFixed(2) ?? '-'}</td>
      <td>Change</td>
      <td>%</td>
      <td>{px?.Delta?.toFixed(4) ?? '-'}</td>
      <td>{px?.Theta?.toFixed(4) ?? '-'}</td>
      <td>
        {
          (!!base && !!theta && theta > 1E-5) ?
            formatPercent({numerator: Math.abs(theta), denominator: base}) :
            '-'
        }
      </td>
      <td>
        {
          (!!base && !!spread) ?
            formatPercent({numerator: spread, denominator: base}) :
            '-'
        }
      </td>
    </>
  );
};
