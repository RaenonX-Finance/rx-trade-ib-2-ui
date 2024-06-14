import React from 'react';

import sum from 'lodash/sum';
import uniq from 'lodash/uniq';

import {useOptionGexContractsSelector, useOptionGexDefinitionSelector} from '@/state/option/selector';
import {useGlobalPxSelector} from '@/state/px/selector';
import {getClosestStrike} from '@/ui/options/common/utils';
import {OptionsGexCalcResult, OptionsGexData, OptionsGexDataOfPair} from '@/ui/options/gex/chart/calc/type';
import {getOptionsGammaExposureOfSide} from '@/ui/options/gex/chart/calc/utils';
import {sortAsc} from '@/utils/sort/byKey/asc';
import {isNotNullish} from '@/utils/type';


export const useOptionsGexCalcResult = () => {
  const contracts = useOptionGexContractsSelector();
  const definition = useOptionGexDefinitionSelector();
  const pxGlobal = useGlobalPxSelector();

  const [inactiveExpiry, setInactiveExpiry] = React.useState<Record<string, boolean>>({});

  const result = React.useMemo((): OptionsGexCalcResult => {
    if (!definition) {
      return {
        byStrike: [],
        closestStrike: null,
        possibleExpiry: [],
        total: 0,
      } satisfies OptionsGexCalcResult;
    }

    const spotPx = pxGlobal[definition.underlyingContractId];

    const strikes = uniq(
      contracts
        // For `call` and `put`, being `0` means that there's no corresponding contract for it
        .filter(({expiry, call, put}) => !inactiveExpiry[expiry] && (!!call || !!put))
        .map(({strike}) => strike),
    ).toSorted(sortAsc((strike) => strike));
    const contractsByStrike = Object.groupBy(contracts, ({strike}) => strike);

    const closestStrike = getClosestStrike({strikes, spotPx});

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
              optionsPx: pxGlobal[call],
              spotPx,
            });
            const netGammaPut = getOptionsGammaExposureOfSide({
              optionsPx: pxGlobal[put],
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

            const callOi = pxGlobal[call]?.OptionCallOpenInterest ?? 0;
            const putOi = pxGlobal[put]?.OptionPutOpenInterest ?? 0;

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
  }, [contracts, definition, pxGlobal, inactiveExpiry]);

  return {
    result,
    inactiveExpiry,
    setInactiveExpiry,
  };
};
