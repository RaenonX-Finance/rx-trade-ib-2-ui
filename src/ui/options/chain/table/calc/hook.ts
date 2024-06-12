import React from 'react';

import {useOptionChainDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {ContractId} from '@/types/data/px';
import {OptionChainDataOfContract} from '@/ui/options/chain/table/calc/type';
import {getTimeNeutralUnderlyingMovementPercent} from '@/ui/options/chain/table/calc/utils';
import {getPxSpread, getReferencePx} from '@/utils/calc/tick';
import {getChange} from '@/utils/math';
import {isNotNullish} from '@/utils/type';


export const useOptionChainDataOfContract = (contractId: ContractId) => {
  const optionsPx = usePxSelector(contractId);

  const definition = useOptionChainDefinitionSelector();
  const underlyingPx = usePxSelector(definition?.underlyingContractId);

  return React.useMemo((): OptionChainDataOfContract => {
    const spread = getPxSpread(optionsPx);
    const referencePx = getReferencePx(optionsPx);

    const changeInfo = getChange({
      original: optionsPx?.Close,
      after: referencePx,
    });

    const theta = optionsPx?.Theta;

    return {
      optionsPx,
      last: {
        isClose: !isNotNullish(optionsPx?.Last) && isNotNullish(optionsPx?.Close),
        px: optionsPx?.Last ?? optionsPx?.Close,
      },
      changeInfo,
      dailyLossPercent: theta ? (theta / referencePx * 100) : null,
      timeNeutralMovementPercent: getTimeNeutralUnderlyingMovementPercent({
        optionsPx,
        underlyingPx,
      }),
      spreadPercent: spread ? (spread / referencePx * 100) : null,
    };
  }, [optionsPx, definition, underlyingPx]);
};
