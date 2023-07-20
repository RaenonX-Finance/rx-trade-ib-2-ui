import React from 'react';

import {useTradingViewChart} from '@/components/chart/base/hook';
import {ChartLastUpdateComplete, ChartLastUpdateSimplified} from '@/components/chart/base/lastUpdate';
import {
  ChartCalcAddons,
  ChartRenderAddons,
  ChartSetStateAddons,
  ChartUnderlyingData,
  OnChartUpdatedHandler,
  UseChartPayload,
} from '@/components/chart/base/type';
import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {chartShowFromOpen} from '@/components/chart/positioning';
import {ChartToolbarComplete} from '@/components/chart/toolbar/complete';
import {ChartToolbarSimplified} from '@/components/chart/toolbar/simplified';
import {ChartToolbarProps} from '@/components/chart/toolbar/type';
import {chartConfigDispatchers} from '@/state/chartConfig/dispatchers';
import {useSingleChartConfigSelector} from '@/state/chartConfig/selector';
import {ChartConfigDispatcherName, ChartConfigUpdatePayload} from '@/state/chartConfig/type';
import {getChartConfig} from '@/state/chartConfig/utils';
import {useLastPxUpdateSelector} from '@/state/chartMeta/selector';
import {useDispatch} from '@/state/store';
import {ChartData, ChartDataIdentifier} from '@/types/data/chart';
import {getContractIdFromIdentifier} from '@/utils/chart';


export type TradingViewChartProps<T, P, R, L, A extends ChartConfigSingle> =
  Pick<UseChartPayload<T, R, L, A, P>, 'initChart' | 'width' | 'height' | keyof ChartUnderlyingData> & {
    onDataUpdated: OnChartUpdatedHandler<T, P, R, L, A>,
    chartData: T,
    payload: P,
    calcAddons: ChartCalcAddons<T, L>,
    renderAddons: ChartRenderAddons<L>,
    renderChartConfig: ChartToolbarProps<T, A>['renderChartConfig'],
    getIdentifier: (data: T) => ChartDataIdentifier,
    getCompleteUpdateDeps: (data: T) => React.DependencyList,
    getAutoFixRangeDeps: (data: T) => React.DependencyList,
  };

export const TradingViewChart = <T extends ChartData, P, R, L>({
  initChart,
  width,
  height,
  onDataUpdated,
  calcAddons,
  chartData,
  payload,
  renderAddons,
  renderChartConfig,
  getIdentifier,
  getCompleteUpdateDeps,
  getAutoFixRangeDeps,
  ...underlyingData
}: TradingViewChartProps<T, P, R, L, ChartConfigSingle>) => {
  const {simplified, contract} = underlyingData;

  const chartDataIdentifier = getIdentifier(chartData);
  const chartContractId = getContractIdFromIdentifier(chartDataIdentifier);

  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const chartDataRef = React.useRef<T>(chartData);
  const chartConfig = useSingleChartConfigSelector(chartDataIdentifier, simplified);
  const [legend, setLegend] = React.useState<L>(calcAddons.legend(
    chartData,
    getTypeOfActiveSeries({chartConfig, simplified}),
  ));
  const dispatch = useDispatch();
  const lastUpdate = useLastPxUpdateSelector(chartContractId);

  const setAddon: ChartSetStateAddons<L> = {
    legend: setLegend,
  };

  const setChartConfig = async (payload: ChartConfigUpdatePayload) => {
    await dispatch(chartConfigDispatchers[ChartConfigDispatcherName.UPDATE_CHART_CONFIG](payload));
  };

  const onDataUpdatedInternal = React.useCallback((partial: boolean) => () => {
    chartDataRef.current = chartData;

    onDataUpdated({
      chartRef,
      chartDataRef,
      chartApiRef,
      setAddon,
      payload,
      chartConfig,
      partial,
      ...underlyingData,
    });
  }, [chartData, payload, chartConfig, ...Object.values(underlyingData)]);

  const {makeChart, chartRef, chartApiRef} = useTradingViewChart<T, R, L, ChartConfigSingle, P>({
    initChart,
    onDataUpdated: onDataUpdatedInternal(true),
    width,
    height,
    ...underlyingData,
  });

  const toolbarProps: ChartToolbarProps<T, ChartConfigSingle> = {
    chartConfig,
    chartRef,
    chartDataRef,
    renderChartConfig,
    setChartConfig,
    contract,
  };

  React.useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    chartDataRef.current = chartData;
    makeChart({
      chartDataRef,
      setAddon,
      chartConfig,
      chartContainer: chartContainerRef.current,
      width,
      height,
      ...payload,
    });

    return () => chartRef.current?.remove();
  }, []);
  React.useEffect(
    onDataUpdatedInternal(true),
    [chartApiRef.current?.initData, lastUpdate],
  );
  React.useEffect(
    onDataUpdatedInternal(false),
    // `chartConfig` should trigger complete update because some config requires full re-paint
    // > For example, candlestick color
    [chartConfig, ...getCompleteUpdateDeps(chartData)],
  );
  React.useEffect(() => {
    if (getChartConfig({config: chartConfig, key: 'isAutoFixRange', simplified})) {
      chartShowFromOpen({chartRef, chartDataRef, contract});
    }
  }, getAutoFixRangeDeps(chartData));

  return (
    <div className="relative h-full w-full" ref={chartContainerRef}>
      <div className="absolute z-10">
        {renderAddons.legend(legend)}
      </div>
      <div className="absolute right-0 z-10">
        {renderAddons.extrema(legend)}
      </div>
      <div className="absolute bottom-1 left-1 z-10">
        {
          simplified ?
            <ChartToolbarSimplified {...toolbarProps}/> :
            <ChartToolbarComplete {...toolbarProps}/>
        }
      </div>
      <div className="absolute bottom-1 right-1 z-10">
        {
          simplified ?
            <ChartLastUpdateSimplified lastUpdate={lastUpdate}/> :
            <ChartLastUpdateComplete lastUpdate={lastUpdate}/>
        }
      </div>
    </div>
  );
};
