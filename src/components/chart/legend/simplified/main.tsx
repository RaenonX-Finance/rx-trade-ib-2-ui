import React from 'react';

import {ChartSimplifiedLegendOfCandlestick} from '@/components/chart/legend/simplified/candlestick';
import {ChartSimplifiedLegendOfLine} from '@/components/chart/legend/simplified/line';
import {ChartSimplifiedLegendOfWhitespace} from '@/components/chart/legend/simplified/whitespace';
import {ChartLegendProps} from '@/components/chart/legend/type';
import {isBarInUseCandlestick, isBarInUseLine, isBarInUseWhitespace} from '@/components/chart/legend/utils';


export const ChartSimplifiedLegend = ({legend}: ChartLegendProps) => {
  const {lastBarOnChart} = legend;

  if (isBarInUseCandlestick(lastBarOnChart)) {
    return <ChartSimplifiedLegendOfCandlestick legend={legend} data={lastBarOnChart}/>;
  }

  if (isBarInUseLine(lastBarOnChart)) {
    return <ChartSimplifiedLegendOfLine legend={legend} data={lastBarOnChart}/>;
  }

  if (isBarInUseWhitespace(lastBarOnChart)) {
    return <ChartSimplifiedLegendOfWhitespace legend={legend} data={lastBarOnChart}/>;
  }

  throw new Error(`BarOnChart: Unhandled simplified legend display for bar: ${JSON.stringify(lastBarOnChart)}`);
};
