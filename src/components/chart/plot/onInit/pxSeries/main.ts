import {ISeriesApi} from 'lightweight-charts';

import {toLineData} from '@/components/chart/convert/data';
import {AddPxLineOptions} from '@/components/chart/plot/onInit/pxSeries/type';
import {getPriceFormat} from '@/components/chart/plot/utils';
import {getChartConfig} from '@/state/chartConfig/utils';


export const addPxSeries = ({
  chartRef,
  chartDataRef,
  contract,
  chartConfig,
  simplified,
  keyOfConfig,
  keyForLineData,
  ...props
}: AddPxLineOptions): ISeriesApi<'Line'> => {
  if (!chartRef.current) {
    throw new Error(`Adding price line of [${contract.localSymbol}] while the chart is not ready`);
  }

  const visibleLine = getChartConfig({config: chartConfig, key: keyOfConfig, simplified});

  const series = chartRef.current.addLineSeries({
    ...props,
    visible: visibleLine,
    lastValueVisible: false,
    priceFormat: getPriceFormat(contract),
  });
  series.setData(chartDataRef.current.bars.map(toLineData((bar) => bar[keyForLineData])));

  return series;
};
