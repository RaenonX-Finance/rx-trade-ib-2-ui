import React from 'react';

import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import uniq from 'lodash/uniq';

import {useOptionGexContractsSelector, useOptionGexDefinitionSelector} from '@/state/option/selector';
import {useGlobalPxSelector} from '@/state/px/selector';
import {OptionsGexCalcResult, OptionsGexData, OptionsGexNetGamma} from '@/ui/options/gex/chart/calc/type';
import {getOptionsGammaExposureOfSide} from '@/ui/options/gex/chart/calc/utils';
import {sortAsc} from '@/utils/sort/byKey/asc';


export const useOptionsGexCalcResult = (): OptionsGexCalcResult => {
  const contracts = useOptionGexContractsSelector();
  const definition = useOptionGexDefinitionSelector();
  const pxGlobal = useGlobalPxSelector();

  return React.useMemo(() => {
    if (!definition) {
      return {byStrike: [], possibleExpiry: [], total: 0};
    }

    const spotPx = pxGlobal[definition.underlyingContractId];

    const strikes = uniq(contracts.map(({strike}) => strike)).toSorted(sortAsc((strike) => strike));
    const contractsByStrike = groupBy(contracts, ({strike}) => strike);

    const byStrike = strikes.map((strike): OptionsGexData => {
      const netGammaByExpiry = contractsByStrike[strike].map(({call, put, expiry}) => {
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
          } satisfies OptionsGexNetGamma,
        };
      });

      return {
        strike,
        netGammaSum: {
          call: sum(netGammaByExpiry.map(({netGamma}) => netGamma.call)),
          put: sum(netGammaByExpiry.map(({netGamma}) => netGamma.put)),
          total: sum(netGammaByExpiry.map(({netGamma}) => netGamma.total)),
        },
        netGammaByExpiry: Object.fromEntries(netGammaByExpiry.map(({expiry, netGamma}) => [expiry, netGamma])),
      };
    });

    return {
      byStrike,
      possibleExpiry: uniq(contracts.map(({expiry}) => expiry).toSorted(sortAsc())),
      total: sum(byStrike.map(({netGammaSum}) => netGammaSum.total)),
    };
  }, [contracts, definition, pxGlobal]);
};
