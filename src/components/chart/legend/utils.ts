import {CandlestickData, LineData, WhitespaceData} from 'lightweight-charts';

import {ChartBarInUse} from '@/components/chart/type';
import {isSubset} from '@/utils/array/subset';


export const isBarInUseWhitespace = (bar: ChartBarInUse): bar is WhitespaceData => {
  return !isSubset(Object.keys(bar), ['value', 'close']);
};

export const isBarInUseLine = (bar: ChartBarInUse): bar is LineData => {
  return isSubset(Object.keys(bar), ['time', 'value']);
};

export const isBarInUseCandlestick = (bar: ChartBarInUse): bar is CandlestickData => {
  return isSubset(Object.keys(bar), ['time', 'open', 'high', 'close', 'low']);
};
