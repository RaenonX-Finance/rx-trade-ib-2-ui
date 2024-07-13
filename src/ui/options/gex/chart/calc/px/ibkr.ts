import React from 'react';

import {differenceInDays} from 'date-fns/differenceInDays';
import {parse} from 'date-fns/parse';

import {useContractSelector} from '@/state/contract/selector';
import {useOptionGexContractsSelector, useOptionGexDefinitionSelector} from '@/state/option/selector';
import {useGlobalPxSelector} from '@/state/px/selector';
import {
  OptionPxContract,
  OptionPxQuoteOfContract,
  OptionPxQuotes,
} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexCalcCommonOpts} from '@/ui/options/gex/chart/calc/type';
import {getReferencePx} from '@/utils/calc/tick';
import {isNotNullish} from '@/utils/type';


export const useOptionPxQuotesFromIbkr = ({active, request}: OptionsGexCalcCommonOpts): OptionPxQuotes | null => {
  const contracts = useOptionGexContractsSelector();
  const definition = useOptionGexDefinitionSelector();
  const pxGlobal = useGlobalPxSelector();
  const underlyingContract = useContractSelector(definition?.underlyingContractId);

  return React.useMemo((): OptionPxQuotes | null => {
    if (!active || !definition || !underlyingContract || !request) {
      return null;
    }

    const {rangePercent, expiryDays} = request;

    const spotPx = getReferencePx(pxGlobal[definition.underlyingContractId]);

    const pxUpdated = Date.now();

    return {
      ticker: underlyingContract.localSymbol,
      spotPx,
      optionPx: Object.fromEntries(contracts.flatMap((contract) => {
        const {call, put} = contract;

        const callPx = pxGlobal[call];
        const putPx = pxGlobal[put];

        return [
          [
            call,
            {
              ticker: call.toString(),
              px: getReferencePx(callPx),
              pxUpdated,
              openInterest: callPx?.OptionCallOpenInterest,
              iv: callPx?.ImpliedVolatility,
              delta: callPx?.Delta,
              theta: callPx?.Theta,
              gamma: callPx?.Gamma,
              vega: callPx?.Vega,
            } satisfies OptionPxQuoteOfContract,
          ],
          [
            put,
            {
              ticker: put.toString(),
              px: getReferencePx(putPx),
              pxUpdated,
              openInterest: putPx?.OptionCallOpenInterest,
              iv: putPx?.ImpliedVolatility,
              delta: putPx?.Delta,
              theta: putPx?.Theta,
              gamma: putPx?.Gamma,
              vega: putPx?.Vega,
            } satisfies OptionPxQuoteOfContract,
          ],
        ];
      })),
      contracts: contracts
        .map(({call, put, expiry, strike}): OptionPxContract | null => {
          if (strike / spotPx - 1 > rangePercent / 100) {
            return null;
          }

          if (differenceInDays(parse(expiry, 'yyyyMMdd', new Date()), new Date()) > expiryDays) {
            return null;
          }

          return {
            call: call.toString(),
            put: put.toString(),
            expiry,
            strike,
          };
        })
        .filter(isNotNullish),
    };
  }, [contracts, definition, pxGlobal, underlyingContract]);
};
