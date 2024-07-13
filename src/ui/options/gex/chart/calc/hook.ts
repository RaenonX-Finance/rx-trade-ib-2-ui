import React from 'react';

import sum from 'lodash/sum';
import uniq from 'lodash/uniq';

import {getClosestStrikeFromContract} from '@/ui/options/common/utils';
import {useOptionPxQuotesFromApi} from '@/ui/options/gex/chart/calc/px/api/main';
import {useOptionPxQuotesFromIbkr} from '@/ui/options/gex/chart/calc/px/ibkr';
import {
  OptionsGexCalcCommonOpts,
  OptionsGexCalcControl,
  OptionsGexCalcResult,
  OptionsGexData,
  OptionsGexDataOfPair,
} from '@/ui/options/gex/chart/calc/type';
import {getOptionsGammaExposureOfSide} from '@/ui/options/gex/chart/calc/utils';
import {sortAsc} from '@/utils/sort/byKey/asc';
import {isNotNullish} from '@/utils/type';


export const useOptionsGexCalcResult = (opts: Omit<OptionsGexCalcCommonOpts, 'active'>): OptionsGexCalcControl => {
  const [
    inactiveExpiry,
    setInactiveExpiry,
  ] = React.useState<Record<string, boolean>>({});

  // Main price source
  const pxQuotesFromApi = useOptionPxQuotesFromApi({
    active: process.env.NEXT_PUBLIC_OPTION_CHAIN_SOURCE === 'api',
    ...opts,
  });
  const pxQuotesFromIbkr = useOptionPxQuotesFromIbkr({
    active: process.env.NEXT_PUBLIC_OPTION_CHAIN_SOURCE === 'ibkr',
    ...opts,
  });
  const pxQuoteActive = pxQuotesFromApi?.quote ?? pxQuotesFromIbkr;

  const result = React.useMemo((): OptionsGexCalcResult => {
    if (!pxQuoteActive) {
      return {
        byStrike: [],
        closestStrike: null,
        possibleExpiry: [],
        total: 0,
      } satisfies OptionsGexCalcResult;
    }

    const {spotPx, contracts, optionPx} = pxQuoteActive;

    const strikes = uniq(
      contracts
        // For `call` and `put`, being `0` means that there's no corresponding contract for it
        .filter(({expiry, call, put}) => !inactiveExpiry[expiry] && (!!call || !!put))
        .map(({strike}) => strike),
    ).toSorted(sortAsc((strike) => strike));
    const contractsByStrike = Object.groupBy(contracts, ({strike}) => strike);

    const closestStrike = getClosestStrikeFromContract({strikes, spotPx});

    const byStrike = strikes
      .map((strike): OptionsGexData | null => {
        const contractsOfStrike = contractsByStrike[strike];
        if (!contractsOfStrike) {
          return null;
        }

        const netGammaByExpiry = contractsOfStrike
          .map(({call, put, expiry}) => {
            if (inactiveExpiry[expiry]) {
              return null;
            }

            const netGammaCall = getOptionsGammaExposureOfSide({
              optionsPx: call ? optionPx[call] : null,
              spotPx,
            });
            const netGammaPut = getOptionsGammaExposureOfSide({
              optionsPx: put ? optionPx[put] : null,
              spotPx,
            });

            return {
              expiry,
              netGamma: {
                call: netGammaCall,
                put: netGammaPut,
                total: netGammaCall - netGammaPut,
              } satisfies OptionsGexDataOfPair,
            };
          })
          .filter(isNotNullish);

        const oiByExpiry = contractsOfStrike
          .map(({call, put, expiry}) => {
            if (inactiveExpiry[expiry]) {
              return null;
            }

            const callOi = (call ? optionPx[call].openInterest : null) ?? 0;
            const putOi = (put ? optionPx[put].openInterest : null) ?? 0;

            return {
              expiry,
              oi: {
                call: callOi,
                put: putOi,
                total: callOi + putOi,
              } satisfies OptionsGexDataOfPair,
            };
          })
          .filter(isNotNullish);

        return {
          strike,
          netGammaSum: {
            call: sum(netGammaByExpiry?.map(({netGamma}) => netGamma.call)),
            put: sum(netGammaByExpiry?.map(({netGamma}) => netGamma.put)),
            total: sum(netGammaByExpiry?.map(({netGamma}) => netGamma.total)),
          },
          netGammaByExpiry: Object.fromEntries(netGammaByExpiry.map(({expiry, netGamma}) => [expiry, netGamma]) ?? []),
          oi: {
            call: sum(oiByExpiry?.map(({oi}) => oi.call)),
            put: sum(oiByExpiry?.map(({oi}) => oi.put)),
            total: sum(oiByExpiry?.map(({oi}) => oi.total)),
          },
          oiByExpiry: Object.fromEntries(oiByExpiry.map(({expiry, oi}) => [expiry, oi]) ?? []),
        };
      })
      .filter(isNotNullish);

    return {
      byStrike,
      closestStrike,
      possibleExpiry: uniq(contracts.map(({expiry}) => expiry).toSorted(sortAsc())),
      total: sum(byStrike.map(({netGammaSum}) => netGammaSum.total)),
    };
  }, [inactiveExpiry, pxQuoteActive]);

  return {
    result,
    quote: pxQuoteActive,
    inactiveExpiry,
    setInactiveExpiry,
    gex: pxQuotesFromApi?.gex,
  };
};
