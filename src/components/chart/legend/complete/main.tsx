import React from 'react';

import {ChartCompleteLegendOfCandlestick} from '@/components/chart/legend/complete/candlestick';
import {ChartCompleteLegendOfLine} from '@/components/chart/legend/complete/line';
import {ChartCompleteLegendOfWhitespace} from '@/components/chart/legend/complete/whitespace';
import {ChartLegendProps} from '@/components/chart/legend/type';
import {isBarInUseCandlestick, isBarInUseLine, isBarInUseWhitespace} from '@/components/chart/legend/utils';


export const ChartCompleteLegend = ({legend}: ChartLegendProps) => {
  const {lastBarOnChart} = legend;

  if (isBarInUseCandlestick(lastBarOnChart)) {
    return <ChartCompleteLegendOfCandlestick legend={legend} data={lastBarOnChart}/>;
  }

  if (isBarInUseLine(lastBarOnChart)) {
    return <ChartCompleteLegendOfLine legend={legend} data={lastBarOnChart}/>;
  }

  if (isBarInUseWhitespace(lastBarOnChart)) {
    return <ChartCompleteLegendOfWhitespace legend={legend} data={lastBarOnChart}/>;
  }

  throw new Error(`BarOnChart: Unhandled complete legend display for bar: ${JSON.stringify(lastBarOnChart)}`);
};
