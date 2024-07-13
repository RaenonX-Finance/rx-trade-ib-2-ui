import React from 'react';

import {useOptionGexContractsSelector, useOptionGexDefinitionSelector} from '@/state/option/selector';
import {useGlobalPxSelector} from '@/state/px/selector';
import {OptionsGexPriceData, OptionsGexStatsRequest, OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';
import {sendPost} from '@/utils/api';
import {getReferencePx} from '@/utils/calc/tick';
import {Nullable} from '@/utils/type';


type UseOptionsGexStatsOpts = {
  inactiveExpiry: Record<string, boolean>,
  override?: Nullable<OptionsGexStatsResponse>,
};

export const useOptionsGexStats = ({inactiveExpiry, override}: UseOptionsGexStatsOpts) => {
  const definition = useOptionGexDefinitionSelector();
  const gexLoadedContracts = useOptionGexContractsSelector();
  const globalPx = useGlobalPxSelector();

  const [stats, setStats] = React.useState<OptionsGexStatsResponse | null>(override ?? null);

  const calculateGexStats = React.useCallback(async () => {
    if (!definition || !gexLoadedContracts.length) {
      return null;
    }

    const optionsPrice: OptionsGexPriceData[] = [];
    for (const {expiry, strike, call, put} of gexLoadedContracts) {
      if (inactiveExpiry[expiry]) {
        // Skip handling inactive expiry
        continue;
      }

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

    const response = await sendPost<OptionsGexStatsRequest, OptionsGexStatsResponse>({
      url: `${process.env.NEXT_PUBLIC_MATH_API}/options/gex`,
      payload: request,
    });

    setStats(response);
  }, [inactiveExpiry, definition, gexLoadedContracts, globalPx]);

  React.useEffect(() => {
    if (override) {
      // If `override` is provided, don't set up the timer for periodic re-calc
      return;
    }

    // Initial run on load
    // Using `setTimeout()` to debounce because `calculateGexStats()` could update a lot in a short time
    const timeoutId = setTimeout(calculateGexStats, 1000);

    const intervalId = setInterval(calculateGexStats, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [calculateGexStats, override]);

  return {stats, calculateGexStats};
};
