import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {SimplifiedChart} from '@/components/chart/preset/simplified';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {useChartDataSelector} from '@/state/chartPx/selector';
import {useContractSelector} from '@/state/contract/selector';
import {OptionVolatilityActiveState} from '@/ui/options/volatility/type';


type Props = {
  state: OptionVolatilityActiveState,
};

export const OptionsVolatilityHistoryChartLoaded = ({state}: Props) => {
  const {
    contractId,
    type,
    identifier,
  } = state;

  const activeIdentifier = identifier[type];

  const account = useCurrentAccountSelector();

  const contract = useContractSelector(contractId);
  const chartData = useChartDataSelector(activeIdentifier);

  const {
    ref,
    width,
    height,
  } = useResizeObserver<HTMLDivElement>();

  return (
    <div className="size-full" ref={ref}>
      <SimplifiedChart
        chartData={chartData}
        account={account}
        contract={contract}
        identifier={activeIdentifier}
        width={width}
        height={height}
      />
    </div>
  );
};
