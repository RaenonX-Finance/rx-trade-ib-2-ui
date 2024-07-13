import React from 'react';

import {useOptionGexContractsSelector, useOptionGexExpectedExpirySelector} from '@/state/option/selector';
import {OptionPxQuotes} from '@/ui/options/gex/chart/calc/px/type';


type UseOptionsGexChartParamsOpts = {
  quote: OptionPxQuotes | null,
};

export const useOptionsGexChartParams = ({
  quote,
}: UseOptionsGexChartParamsOpts) => {
  const gexLoadedContractsFromIbkr = useOptionGexContractsSelector();
  const gexExpectedExpiryFromIbkr = useOptionGexExpectedExpirySelector();

  const loadedExpiry = React.useMemo(
    () => new Set([
      ...gexLoadedContractsFromIbkr.map(({expiry}) => expiry),
      ...(quote?.contracts.map(({expiry}) => expiry) ?? []),
    ]),
    [gexLoadedContractsFromIbkr],
  );
  const expectedExpiry = React.useMemo(
    () => [...new Set([
      ...gexExpectedExpiryFromIbkr,
      ...(quote?.contracts.map(({expiry}) => expiry) ?? []),
    ])].toSorted(),
    [gexLoadedContractsFromIbkr],
  );

  return {
    loadedExpiry,
    expectedExpiry,
  };
};
