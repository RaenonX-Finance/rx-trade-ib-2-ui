import {IPriceLine, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {
  OnChartChangedCommonPayload,
  OnChartInitHandler,
  OnChartInitPayload,
  OnChartUpdatedHandler,
  OnChartUpdatedPayload,
} from '@/components/chart/base/type';
import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {ChartData} from '@/types/data/chart';


export type ChartSeries = ISeriesApi<'Line' | 'Candlestick'>;

export type ChartExtremaSeries = {
  min: IPriceLine,
  max: IPriceLine,
};

export type ChartLines = {
  extrema: ChartExtremaSeries,
  positionAvgPx: IPriceLine,
};

export type ChartLegendExtrema = {
  max: number,
  min: number,
};

export type ChartLegendData = {
  epochSec: number,
  lastBarOnChart: ChartBarInUse,
  extrema?: ChartLegendExtrema,
  digits: number,
  hovered: boolean,
};

export type ChartInitData = {
  series: ChartSeries,
  lines: ChartLines,
};

export type ChartPayload = {
  requestPxData: (offset: number) => void,
};

export type ChartChangedCommonPayload = OnChartChangedCommonPayload<
  ChartData,
  ChartInitData,
  ChartLegendData,
  ChartConfigSingle
>;

export type ChartInitPayload = OnChartInitPayload<
  ChartData,
  ChartInitData,
  ChartLegendData,
  ChartConfigSingle,
  ChartPayload
>;

export type ChartInitHandler = OnChartInitHandler<
  ChartData,
  ChartInitData,
  ChartLegendData,
  ChartConfigSingle,
  ChartPayload
>;

export type ChartUpdatedPayload = OnChartUpdatedPayload<
  ChartData,
  ChartPayload,
  ChartInitData,
  ChartLegendData,
  ChartConfigSingle
>;

export type ChartUpdatedHandler = OnChartUpdatedHandler<
  ChartData,
  ChartPayload,
  ChartInitData,
  ChartLegendData,
  ChartConfigSingle
>;

export type ChartBarInUse = SeriesDataItemTypeMap['Candlestick' | 'Line'];
