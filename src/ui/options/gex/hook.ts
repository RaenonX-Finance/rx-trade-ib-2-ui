import {differenceInDays} from 'date-fns/differenceInDays';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';

import {optionDispatchers} from '@/state/option/dispatchers';
import {OptionDispatcherName} from '@/state/option/types';
import {useDispatch} from '@/state/store';
import {useOptionPxManager} from '@/ui/options/common/hook/pxManager';
import {UseOptionPxManagerCommonOpts} from '@/ui/options/common/hook/type';
import {optionsGexStrikeRange} from '@/ui/options/gex/const';
import {OptionGexPxSubscribeRequestState} from '@/ui/options/gex/type';


export const useOptionGexPxManager = (opts: UseOptionPxManagerCommonOpts) => {
  const {definition} = opts;

  const dispatch = useDispatch();

  return useOptionPxManager<OptionGexPxSubscribeRequestState>({
    ...opts,
    getRequests: (payload, priceBase) => {
      const {account, symbol, tradingClass, expiryMaxDays} = payload;

      if (!priceBase || !definition) {
        return null;
      }

      const now = new Date();
      const expiryList = definition.expiry
        .map((expiry) => parse(expiry, 'yyyyMMdd', new Date()))
        .filter((expiry) => expiryMaxDays != null ? differenceInDays(expiry, now) <= expiryMaxDays : true)
        .map((expiry) => format(expiry, 'yyyyMMdd'));

      dispatch(optionDispatchers[OptionDispatcherName.GEX_SET_EXPECTED_EXPIRY](expiryList));

      const strikeLowerBound = priceBase * (1 - optionsGexStrikeRange);
      const strikeUpperBound = priceBase * (1 + optionsGexStrikeRange);

      return expiryList.map((expiry) => ({
        origin: 'GammaExposure',
        type: 'OneTime',
        account,
        symbol,
        tradingClass,
        expiry: [expiry],
        strikes: definition.strike.filter((strike) => strike >= strikeLowerBound && strike <= strikeUpperBound),
      }));
    },
  });
};
