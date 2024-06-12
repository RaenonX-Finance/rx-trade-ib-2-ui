import React from 'react';

import {clsx} from 'clsx';

import {useOptionChainDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {ContractId} from '@/types/data/px';
import {getTimeNeutralUnderlyingMovementRequired} from '@/ui/options/chain/table/calc/utils';
import {getDeltaTextStyle} from '@/ui/options/chain/table/style';
import {getPxSpread, getReferencePx} from '@/utils/calc/tick';
import {formatPercentFromFraction} from '@/utils/format/number/percent';
import {formatFloat, formatFloat4} from '@/utils/format/number/regular';
import {formatSignedNumber} from '@/utils/format/number/signed';
import {getChange} from '@/utils/math';
import {isNotNullish} from '@/utils/type';


type Props = {
  contractId: ContractId,
};

export const OptionChainDataCells = ({contractId}: Props) => {
  const optionsPx = usePxSelector(contractId);

  const definition = useOptionChainDefinitionSelector();
  const underlyingPx = usePxSelector(definition?.underlyingContractId);

  const spread = getPxSpread(optionsPx);
  const referencePx = getReferencePx(optionsPx);
  const changeInfo = getChange({original: optionsPx?.Close, after: referencePx});

  return (
    <>
      <td className="whitespace-nowrap">
        {!isNotNullish(optionsPx?.Last) && isNotNullish(optionsPx?.Close) && 'c '}
        {formatFloat(optionsPx?.Last ?? optionsPx?.Close)}
      </td>
      <td className="text-px-bid">{formatFloat(optionsPx?.Bid)}</td>
      <td className="text-px-ask">{formatFloat(optionsPx?.Ask)}</td>
      <td className="text-px-mark">{formatFloat(optionsPx?.Mark)}</td>
      <td className={changeInfo?.textClass}>
        {formatSignedNumber({num: changeInfo?.changeAmt, digits: 2, sign: true})}
      </td>
      <td className={changeInfo?.textClass}>
        {formatSignedNumber({num: changeInfo?.changePct, digits: 2, sign: true})}
      </td>
      <td className={clsx(getDeltaTextStyle(optionsPx?.Delta))}>{formatFloat4(optionsPx?.Delta)}</td>
      <td>
        {formatPercentFromFraction({numerator: optionsPx?.Theta, denominator: referencePx})}
      </td>
      <td>
        {getTimeNeutralUnderlyingMovementRequired({optionsPx, underlyingPx})}
      </td>
      <td>
        {formatPercentFromFraction({numerator: spread, denominator: referencePx})}
      </td>
    </>
  );
};
