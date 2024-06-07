import React from 'react';

import {IChartApi, SeriesType} from 'lightweight-charts';

import {ContractInState} from '@/types/data/contract';
import {PositionData} from '@/types/data/positions';
import {Nullable} from '@/utils/type';


export type ChartSetState<T> = (updateFunc: (prevLegend: T) => T) => void;

export type ChartStatefulAddons<L> = {
  legend: L,
};

export type ChartSetStateAddons<L> = ChartStatefulAddons<ChartSetState<L>>;

export type ChartInitCalcAddon<T, D> = (data: T, seriesType: SeriesType) => D;

export type ChartCalcAddons<T, L> = ChartStatefulAddons<ChartInitCalcAddon<T, L>>;

export type ChartRenderAddon<T> = (data: T) => React.ReactNode;

export type ChartRenderAddons<L> = {
  legend: ChartRenderAddon<L>,
  extrema: ChartRenderAddon<L>,
};

export type ChartApiRef<T> = {
  chartContainer: HTMLDivElement,
  initData: T,
};

export type ChartUnderlyingData = {
  contract: ContractInState,
  position: Nullable<PositionData>,
  simplified: boolean,
};

type ChartInitPayload<T, L, A> = {
  // Needs to be `ref` because crosshair move event subscription refers chart data
  chartDataRef: React.MutableRefObject<T>,
  setAddon: ChartSetStateAddons<L>,
  chartContainer: HTMLDivElement,
  chartConfig: A,
};

export type UseChartPayload<T, R, L, A, P> = ChartUnderlyingData & {
  initChart: OnChartInitHandler<T, R, L, A, P>,
  onDataUpdated: (simplified: boolean) => void,
  width: number,
  height: number,
};

export type UseChartReturn<T, R, L, A, P> = {
  makeChart: (payload: ChartInitPayload<T, L, A> & P) => void,
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartApiRef: React.MutableRefObject<ChartApiRef<R> | undefined>,
};

export type OnChartChangedCommonPayload<T, R, L, A> = ChartUnderlyingData & {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartDataRef: React.MutableRefObject<T>,
  chartApiRef: React.MutableRefObject<ChartApiRef<R> | undefined>,
  setAddon: ChartSetStateAddons<L>,
  chartConfig: A,
};

export type OnChartInitPayload<T, R, L, A, P = {}> =
  ChartInitPayload<T, L, A> &
  OnChartChangedCommonPayload<T, R, L, A> &
  P;

export type OnChartInitHandler<T, R, L, A, P = {}> = (e: OnChartInitPayload<T, R, L, A, P>) => R;

export type OnChartUpdatedPayload<T, P, R, L, A> = OnChartChangedCommonPayload<T, R, L, A> & {
  payload: P,
  partial: boolean,
};

export type OnChartUpdatedHandler<T, P, R, L, A> = (e: OnChartUpdatedPayload<T, P, R, L, A>) => void;
