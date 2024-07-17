import React from 'react';

import {useContractSelector} from '@/state/contract/selector';
import {useOptionGexDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {optionPxQuotesFromApiFetchIntervalMs} from '@/ui/options/gex/chart/calc/px/api/const';
import {
  OptionPxFromApiRequest,
  OptionPxFromApiResponse,
  OptionPxFromApiState,
} from '@/ui/options/gex/chart/calc/px/api/type';
import {OptionsGexCalcCommonOpts} from '@/ui/options/gex/chart/calc/type';
import {sendPost} from '@/utils/api';
import {getReferencePx} from '@/utils/calc/tick';
import {isNotNullish} from '@/utils/type';


type UseOptionPxQuotesFromApiOpts = OptionsGexCalcCommonOpts & {
  inactiveExpiry: Record<string, boolean>,
};

export const useOptionPxQuotesFromApi = ({
  active,
  request,
  inactiveExpiry,
}: UseOptionPxQuotesFromApiOpts): OptionPxFromApiState => {
  const definition = useOptionGexDefinitionSelector();
  const spotPx = usePxSelector(definition?.underlyingContractId);
  const contract = useContractSelector(definition?.underlyingContractId);

  const [result, setResult] = React.useState<OptionPxFromApiState>({
    loading: false,
    response: null,
    lastFetchEpochMs: null,
  });

  React.useEffect(() => {
    if (result.loading) {
      // Do nothing if it's still loading
      return;
    }

    if (result.lastFetchEpochMs && Date.now() - result.lastFetchEpochMs < optionPxQuotesFromApiFetchIntervalMs) {
      // Do nothing if just fetched
      return;
    }

    if (!active || !request) {
      setResult({loading: false, response: null, lastFetchEpochMs: null});
      return;
    }
    const {rangePercent, expiryDays} = request;
    const spotRefPx = request.spotPx ?? getReferencePx(spotPx);
    if (!spotRefPx) {
      // Do nothing if `spotRefPx` is 0 (`request` doesn't have override, and not yet received any from `spotPx`)
      return;
    }

    const ticker = request.ticker ?? contract?.localSymbol;
    if (!ticker) {
      setResult({loading: false, response: null, lastFetchEpochMs: null});
      return;
    }

    setResult(({response, lastFetchEpochMs}) => ({
      loading: true,
      response,
      lastFetchEpochMs,
    }));
    sendPost<OptionPxFromApiRequest, OptionPxFromApiResponse>({
      url: `${process.env.NEXT_PUBLIC_MATH_API}/options/chain`,
      payload: {
        ticker,
        spotPx: spotRefPx,
        avgVolume: spotPx?.AverageVolume ?? 0,
        rangePercent,
        expiryDays,
        gexExpiryExclusions: Object.entries(inactiveExpiry)
          .map(([expiry, active]) => active ? expiry : null)
          .filter(isNotNullish),
      },
    }).then((response) => setResult({
      loading: false,
      response,
      lastFetchEpochMs: Date.now(),
    }));
  }, [request, definition, spotPx, inactiveExpiry]);

  return result;
};
