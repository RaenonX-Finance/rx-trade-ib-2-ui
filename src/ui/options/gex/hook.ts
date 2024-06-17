import {differenceInDays} from 'date-fns/differenceInDays';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import chunk from 'lodash/chunk';

import {optionDispatchers} from '@/state/option/dispatchers';
import {OptionDispatcherName} from '@/state/option/types';
import {useDispatch} from '@/state/store';
import {useOptionPxManager} from '@/ui/options/common/hook/pxManager';
import {UseOptionPxManagerCommonOpts} from '@/ui/options/common/hook/type';
import {optionsGexDefaultStrikeRangePercent} from '@/ui/options/gex/const';
import {OptionGexPxSubscribeRequestState} from '@/ui/options/gex/type';


export const useOptionGexPxManager = (opts: UseOptionPxManagerCommonOpts) => {
  const {definition} = opts;

  const dispatch = useDispatch();

  return useOptionPxManager<OptionGexPxSubscribeRequestState>({
    ...opts,
    getRequests: (payload, priceBase) => {
      const {
        account,
        symbol,
        tradingClass,
        expiryMaxDays,
        rangePercent,
      } = payload;

      if (!priceBase || !definition) {
        return null;
      }

      const now = new Date();
      const expiryList = definition.expiry
        .map((expiry) => parse(expiry, 'yyyyMMdd', new Date()))
        .filter((expiry) => expiryMaxDays != null ? differenceInDays(expiry, now) <= expiryMaxDays : true)
        .map((expiry) => format(expiry, 'yyyyMMdd'));

      dispatch(optionDispatchers[OptionDispatcherName.GEX_SET_EXPECTED_EXPIRY](expiryList));

      const strikeRange = (rangePercent ?? optionsGexDefaultStrikeRangePercent) / 100;
      const strikeLowerBound = priceBase * (1 - strikeRange);
      const strikeUpperBound = priceBase * (1 + strikeRange);

      const chunkedStrikes = chunk(
        definition.strike.filter((strike) => strike >= strikeLowerBound && strike <= strikeUpperBound),
        5,
      );

      // Sends strikes into chunks instead of sending tons of data at once
      return expiryList.flatMap((expiry) => chunkedStrikes.map((strikes) => ({
        origin: 'GammaExposure',
        type: 'OneTime',
        account,
        symbol,
        tradingClass,
        expiry: [expiry],
        strikes,
      })));
    },
  });
};
