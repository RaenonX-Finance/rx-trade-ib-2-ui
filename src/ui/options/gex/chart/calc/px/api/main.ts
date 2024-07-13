import React from 'react';

import {useContractSelector} from '@/state/contract/selector';
import {useOptionGexDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {OptionChainApiRequest, OptionChainApiResponse} from '@/ui/options/gex/chart/calc/px/api/type';
import {OptionsGexCalcCommonOpts} from '@/ui/options/gex/chart/calc/type';
import {sendPost} from '@/utils/api';
import {getReferencePx} from '@/utils/calc/tick';


export const useOptionPxQuotesFromApi = ({
  active,
  request,
}: OptionsGexCalcCommonOpts): OptionChainApiResponse | null => {
  const definition = useOptionGexDefinitionSelector();
  const spotPx = usePxSelector(definition?.underlyingContractId);
  const contract = useContractSelector(definition?.underlyingContractId);

  const [result, setResult] = React.useState<OptionChainApiResponse | null>(null);

  React.useEffect(() => {
    if (!active || !request) {
      setResult(null);
      return;
    }
    const {rangePercent, expiryDays} = request;

    const ticker = request.ticker ?? contract?.localSymbol;
    if (!ticker) {
      setResult(null);
      return;
    }

    sendPost<OptionChainApiRequest, OptionChainApiResponse>({
      url: `${process.env.NEXT_PUBLIC_MATH_API}/options/chain`,
      payload: {
        ticker,
        spotPx: request.spotPx ?? getReferencePx(spotPx),
        rangePercent,
        expiryDays,
      },
    }).then(setResult);
  }, [request, spotPx]);

  return result;
};
