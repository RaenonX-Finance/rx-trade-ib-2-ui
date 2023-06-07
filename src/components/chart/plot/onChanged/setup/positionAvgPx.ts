import {IPriceLine} from 'lightweight-charts';

import {getPositionAvgPxOptions} from '@/components/chart/plot/seriesOptions';
import {ChartChangedCommonPayload, ChartSeries} from '@/components/chart/type';


export const makePositionAvgPx = (e: ChartChangedCommonPayload, series: ChartSeries): IPriceLine => {
  const {
    chartConfig,
    position,
    chartDataRef,
    simplified,
  } = e;

  return series.createPriceLine(getPositionAvgPxOptions({
    chartConfig,
    position,
    bars: chartDataRef.current.bars,
    simplified,
  }));
};
