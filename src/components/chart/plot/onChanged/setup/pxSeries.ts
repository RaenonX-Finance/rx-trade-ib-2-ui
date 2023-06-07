import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {bearColor, bullColor, priceLineColor} from '@/components/chart/const';
import {toCandlestick} from '@/components/chart/convert/data';
import {addPxSeries} from '@/components/chart/plot/onInit/pxSeries/main';
import {getPriceFormat, getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {ChartChangedCommonPayload, ChartSeries} from '@/components/chart/type';
import {getChartConfig} from '@/state/chartConfig/utils';


export const makeCandlestickPxSeries = ({
  chartRef, chartDataRef, chartConfig, contract, simplified,
}: ChartChangedCommonPayload): ISeriesApi<'Candlestick'> => {
  if (!chartRef.current) {
    throw new Error(`Adding price of ${contract.localSymbol} the chart is not ready`);
  }

  const {bars} = chartDataRef.current;

  const price = chartRef.current.addCandlestickSeries({
    upColor: bullColor,
    borderUpColor: bullColor,
    wickUpColor: bullColor,
    downColor: bearColor,
    borderDownColor: bearColor,
    wickDownColor: bearColor,
    priceLineColor,
    priceLineVisible: getChartConfig({config: chartConfig, key: 'lineOfCurrentPx', simplified}),
    priceFormat: getPriceFormat(contract),
  });
  price.setData(bars.map(toCandlestick));

  return price;
};

export const makeLinePxSeries = (e: ChartChangedCommonPayload): ISeriesApi<'Line'> => {
  const {chartConfig, simplified} = e;

  return addPxSeries({
    ...e,
    keyOfConfig: 'showAsLine',
    keyForLineData: 'close',
    lineWidth: 1,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
    priceLineColor,
    priceLineVisible: getChartConfig({config: chartConfig, key: 'lineOfCurrentPx', simplified}),
  });
};

export const makePxSeries = (e: ChartChangedCommonPayload): ChartSeries => {
  const seriesInUse = e.chartApiRef.current?.initData.series;
  if (seriesInUse) {
    e.chartRef.current?.removeSeries(seriesInUse);
  }

  return getTypeOfActiveSeries(e) === 'Line' ? makeLinePxSeries(e) : makeCandlestickPxSeries(e);
};
