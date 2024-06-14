import React from 'react';

import {useOptionGexContractsSelector, useOptionGexDefinitionSelector} from '@/state/option/selector';
import {useGlobalPxSelector} from '@/state/px/selector';
import {OptionsGexPriceData, OptionsGexStatsRequest, OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';
import {sendPost} from '@/utils/api';
import {getReferencePx} from '@/utils/calc/tick';


export const useOptionsGexStats = () => {
  const definition = useOptionGexDefinitionSelector();
  const gexLoadedContracts = useOptionGexContractsSelector();
  const globalPx = useGlobalPxSelector();

  const [stats, setStats] = React.useState<OptionsGexStatsResponse | null>(null);

  const calculateGexFlip = React.useCallback(async (): Promise<OptionsGexStatsResponse | null> => {
    if (!definition) {
      return null;
    }

    const optionsPrice: OptionsGexPriceData[] = [];
    for (const {expiry, strike, call, put} of gexLoadedContracts) {
      const callOptionPx = globalPx[call];
      const putOptionPx = globalPx[put];

      const callIv = callOptionPx?.ImpliedVolatility;
      const callGamma = callOptionPx?.Gamma;
      const callOi = callOptionPx?.OptionCallOpenInterest;
      const putIv = putOptionPx?.ImpliedVolatility;
      const putGamma = putOptionPx?.Gamma;
      const putOi = putOptionPx?.OptionPutOpenInterest;

      if (
        callIv == null ||
        callGamma == null ||
        callOi == null ||
        putIv == null ||
        putGamma == null ||
        putOi == null
      ) {
        continue;
      }

      optionsPrice.push({
        expiry,
        strike,
        callIv,
        callGamma,
        callOi,
        putIv,
        putGamma,
        putOi,
      });
    }

    const request: OptionsGexStatsRequest = {
      spotPrice: getReferencePx(globalPx[definition.underlyingContractId]),
      optionsPrice,
    };

    return await sendPost<OptionsGexStatsRequest, OptionsGexStatsResponse>({
      url: `${process.env.NEXT_PUBLIC_MATH_API}/options/gex`,
      payload: request,
    });
  }, [definition, gexLoadedContracts, globalPx]);

  React.useEffect(() => {
    const updateGexStats = () => calculateGexFlip().then(setStats);

    const intervalId = setInterval(updateGexStats, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return stats;
};