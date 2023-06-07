import {SeriesType} from 'lightweight-charts';

import {toSeriesData} from '@/components/chart/convert/data';
import {ChartLegendData} from '@/components/chart/type';
import {ChartDataBar} from '@/types/api/chart';
import {ChartData} from '@/types/data/chart';


type ToLegendDataFromChartDataOpts = {
  data: ChartData,
  seriesType: SeriesType,
  digits: number,
};

export const toLegendDataFromChartData = ({
  data,
  seriesType,
  digits,
}: ToLegendDataFromChartDataOpts): ChartLegendData => {
  return toLegendDataFromBar({bar: data.bars.at(-1), digits, seriesType, hovered: false});
};

type ToLegendDataFromBarOpts = Pick<ToLegendDataFromChartDataOpts, 'seriesType' | 'digits'> & {
  original?: Partial<ChartLegendData>,
  bar: ChartDataBar | undefined,
  hovered: boolean,
};

export const toLegendDataFromBar = ({
  original,
  bar,
  seriesType,
  digits,
  hovered,
}: ToLegendDataFromBarOpts): ChartLegendData => {
  if (!bar) {
    throw new Error('`bar` is undefined during legend data transformation');
  }

  return {
    ...original,
    epochSec: bar?.epochSec ?? NaN,
    digits,
    lastBarOnChart: toSeriesData(seriesType)(bar),
    hovered,
  };
};
