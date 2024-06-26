import chunk from 'lodash/chunk';

import {OptionChainPxSubscribeRequestState} from '@/ui/options/chain/type';
import {getStrikeRangeToRequest} from '@/ui/options/chain/utils';
import {useOptionPxManager} from '@/ui/options/common/hook/pxManager';
import {UseOptionPxManagerCommonOpts} from '@/ui/options/common/hook/type';


export const useOptionChainPxManager = (opts: UseOptionPxManagerCommonOpts) => {
  const {definition} = opts;

  return useOptionPxManager<OptionChainPxSubscribeRequestState>({
    ...opts,
    getRequests: (payload, priceBase) => {
      if (!priceBase || !definition) {
        return null;
      }

      const {
        account,
        symbol,
        expiry,
        tradingClass,
        strikeRangePercent,
      } = payload;

      const chunkedStrikes = chunk(
        getStrikeRangeToRequest({
          priceBase,
          strikeRangePercent,
          possibleStrikes: definition.strike,
        }),
        3,
      );

      return chunkedStrikes.map((strikes) => ({
        origin: 'OptionChain',
        type: 'Subscribe',
        account,
        symbol,
        expiry,
        tradingClass,
        strikes,
      }));
    },
  });
};
