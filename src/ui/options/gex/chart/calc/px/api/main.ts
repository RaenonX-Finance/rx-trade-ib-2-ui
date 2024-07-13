import React from 'react';

import {useContractSelector} from '@/state/contract/selector';
import {useOptionGexContractsSelector, useOptionGexDefinitionSelector} from '@/state/option/selector';
import {useGlobalPxSelector} from '@/state/px/selector';
import {OptionChainApiRequest, OptionChainApiResponse} from '@/ui/options/gex/chart/calc/px/api/type';
import {OptionsGexCalcCommonOpts} from '@/ui/options/gex/chart/calc/type';
import {sendPost} from '@/utils/api';
import {getReferencePx} from '@/utils/calc/tick';


export const useOptionPxQuotesFromApi = ({
  active,
  request,
}: OptionsGexCalcCommonOpts): OptionChainApiResponse | null => {
  const contracts = useOptionGexContractsSelector();
  const definition = useOptionGexDefinitionSelector();
  const pxGlobal = useGlobalPxSelector();
  const contract = useContractSelector(definition?.underlyingContractId);

  const [result, setResult] = React.useState<OptionChainApiResponse | null>(null);

  React.useEffect(() => {
    if (!active || !request) {
      setResult(null);
      return;
    }
    const {rangePercent, expiryDays} = request;

    if (!definition) {
      setResult(null);
      return;
    }

    const ticker = contract?.localSymbol;
    if (!ticker) {
      setResult(null);
      return;
    }

    const spotPx = pxGlobal[definition.underlyingContractId];

    sendPost<OptionChainApiRequest, OptionChainApiResponse>({
      url: `${process.env.NEXT_PUBLIC_MATH_API}/options/chain`,
      payload: {
        ticker,
        spotPx: getReferencePx(spotPx),
        rangePercent,
        expiryDays,
      },
    }).then(setResult);
  }, [contracts, definition, pxGlobal]);

  return result;
};
