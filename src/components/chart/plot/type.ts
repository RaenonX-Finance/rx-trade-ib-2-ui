import {IChartApi, PriceLineOptions} from 'lightweight-charts';

import {ChartSeries} from '@/components/chart/type';
import {ChartDataBar} from '@/types/api/chart';


export type ExtremaCommonOptions = Omit<PriceLineOptions, 'price' | 'title' | 'lineVisible' | 'axisLabelVisible'>;

export type ExtremaPx = {
  minPx: number,
  maxPx: number,
} | {
  minPx: null,
  maxPx: null,
};

export type GetCurrentExtremaPxOptions = {
  chart: IChartApi,
  bars: ChartDataBar[],
  series: ChartSeries
};
