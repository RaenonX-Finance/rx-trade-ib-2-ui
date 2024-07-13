import React from 'react';

import {useContractSelector} from '@/state/contract/selector';
import {useOptionGexDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {
  OptionPxFromApiRequest,
  OptionPxFromApiResponse,
  OptionPxFromApiState,
} from '@/ui/options/gex/chart/calc/px/api/type';
import {OptionsGexCalcCommonOpts} from '@/ui/options/gex/chart/calc/type';
import {sendPost} from '@/utils/api';
import {getReferencePx} from '@/utils/calc/tick';


export const useOptionPxQuotesFromApi = ({
  active,
  request,
}: OptionsGexCalcCommonOpts): OptionPxFromApiResponse | null => {
  const definition = useOptionGexDefinitionSelector();
  const spotPx = usePxSelector(definition?.underlyingContractId);
  const contract = useContractSelector(definition?.underlyingContractId);

  const [result, setResult] = React.useState<OptionPxFromApiState>({
    loading: false,
    response: null,
  });

  React.useEffect(() => {
    if (result.loading) {
      // Do nothing if it's still loading
      return;
    }

    if (!active || !request) {
      setResult({loading: false, response: null});
      return;
    }
    const {rangePercent, expiryDays} = request;

    const ticker = request.ticker ?? contract?.localSymbol;
    if (!ticker) {
      setResult({loading: false, response: null});
      return;
    }

    setResult(({response}) => ({loading: true, response}));
    sendPost<OptionPxFromApiRequest, OptionPxFromApiResponse>({
      url: `${process.env.NEXT_PUBLIC_MATH_API}/options/chain`,
      payload: {
        ticker,
        spotPx: request.spotPx ?? getReferencePx(spotPx),
        rangePercent,
        expiryDays,
      },
    }).then((response) => setResult({loading: false, response}));
  }, [request, spotPx]);

  return result.response;
};
