import React from 'react';

import {IChartApi} from 'lightweight-charts';

import {ChartConfigUpdatePayload} from '@/state/chartConfig/type';
import {ContractInState} from '@/types/data/contract';


export type ToolbarRenderConfigOpts<A> = {
  contract: ContractInState,
  chartConfig: A,
  setChartConfig: (newConfig: ChartConfigUpdatePayload) => void,
  show: boolean,
  setShow: (show: boolean) => void,
};

export type ChartToolbarProps<T, A> =
  Pick<ToolbarRenderConfigOpts<A>, 'contract' | 'setChartConfig' | 'chartConfig'> & {
    chartRef: React.MutableRefObject<IChartApi | undefined>,
    chartDataRef: React.MutableRefObject<T>,
    renderChartConfig: (opts: ToolbarRenderConfigOpts<A>) => React.ReactNode,
  };
