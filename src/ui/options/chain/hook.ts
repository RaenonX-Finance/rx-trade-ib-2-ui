import {OptionPxResponse} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {OptionChainPxSubscribeRequestState} from '@/ui/options/chain/type';
import {getStrikeRangeToRequest} from '@/ui/options/chain/utils';
import {useOptionPxSubscriber} from '@/ui/options/common/hook/pxSubscriber';
import {Nullable} from '@/utils/type';


type UseOptionChainPxSubscriberOpts = {
  pxRequest: OptionChainPxSubscribeRequestState,
  definition: Nullable<OptionDefinition>,
  onRequestedPx: (response: OptionPxResponse) => void,
};

export const useOptionChainPxSubscriber = ({
  pxRequest,
  definition,
  onRequestedPx,
}: UseOptionChainPxSubscriberOpts) => {
  const {symbol, expiry, account, tradingClass} = pxRequest;

  useOptionPxSubscriber({
    definition,
    requestFixed: {
      symbol,
      expiry,
      account,
      tradingClass,
    },
    getRequest: (requestFixed, priceBase) => {
      if (!priceBase || !definition) {
        return null;
      }

      return {
        ...requestFixed,
        origin: 'OptionChain',
        strikes: getStrikeRangeToRequest({
          priceBase,
          strikeRangePercent: pxRequest.strikeRangePercent,
          possibleStrikes: definition.strike,
        }),
      };
    },
    getDependencies: ({expiry}) => [expiry],
    onRequestedPx,
  });
};
