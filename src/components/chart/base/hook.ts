import React from 'react';

import {createChart, IChartApi} from 'lightweight-charts';

import {completedChartOptions, simplifiedChartOptions} from '@/components/chart/base/const';
import {ChartApiRef, UseChartPayload, UseChartReturn} from '@/components/chart/base/type';


export const useTradingViewChart = <T, R, L, A, P>({
  initChart,
  onDataUpdated,
  width,
  height,
  ...underlyingData
}: UseChartPayload<T, R, L, A, P>): UseChartReturn<T, R, L, A, P> => {
  const chartRef = React.useRef<IChartApi>();
  const chartApiRef = React.useRef<ChartApiRef<R>>();
  const {simplified} = underlyingData;

  const makeChart: UseChartReturn<T, R, L, A, P>['makeChart'] = React.useCallback((payload) => {
    const {chartContainer} = payload;

    chartRef.current = createChart(chartContainer, {
      ...(simplified ? simplifiedChartOptions : completedChartOptions),
      width,
      height,
    });

    chartApiRef.current = {
      chartContainer,
      initData: initChart({chartRef, chartApiRef, ...underlyingData, ...payload}),
    };
  }, [width, height, ...Object.values(underlyingData)]);

  React.useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    chartRef.current.applyOptions({width, height});

    onDataUpdated(simplified);
  }, [width, height]);

  return {makeChart, chartRef, chartApiRef};
};
