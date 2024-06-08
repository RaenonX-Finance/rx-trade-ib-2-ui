import {differenceInDays} from 'date-fns/differenceInDays';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';

import {useOptionPxManager} from '@/ui/options/common/hook/pxManager';
import {UseOptionPxManagerCommonOpts} from '@/ui/options/common/hook/type';
import {OptionGexPxSubscribeRequestState} from '@/ui/options/gex/type';


export const useOptionGexPxManager = (opts: UseOptionPxManagerCommonOpts) => {
  const {definition} = opts;

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

      return expiryList.map((expiry) => ({
        origin: 'GammaExposure',
        account,
        symbol,
        tradingClass,
        expiry: [expiry],
        strikes: definition.strike,
      }));
    },
  });
};