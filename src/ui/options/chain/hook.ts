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

      return [{
        origin: 'OptionChain',
        account,
        symbol,
        expiry,
        tradingClass,
        strikes: getStrikeRangeToRequest({
          priceBase,
          strikeRangePercent,
          possibleStrikes: definition.strike,
        }),
      }];
    },
  });
};
