import {OptionChainPxSubscribeRequestState} from '@/ui/options/chain/type';
import {getStrikeRangeToRequest} from '@/ui/options/chain/utils';
import {useOptionPxSubscriber} from '@/ui/options/common/hook/pxSubscriber';
import {UseOptionPxSubscriberCommonOpts} from '@/ui/options/common/hook/type';


export const useOptionChainPxSubscriber = (opts: UseOptionPxSubscriberCommonOpts) => {
  const {definition} = opts;

  return useOptionPxSubscriber<OptionChainPxSubscribeRequestState>({
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
