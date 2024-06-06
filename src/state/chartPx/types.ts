import {ChartDataIdentifier, ChartDataMap} from '@/types/data/chart';


export const CHART_STATE_NAME = 'Chart';

export enum ChartDispatcherName {
  HISTORY_INIT = 'Chart/HistoryInit',
  HISTORY_UPDATE = 'Chart/HistoryUpdate',
  UPDATE_MARKET = 'Chart/UpdateMarket',
}

export type ChartDataState = {
  data: ChartDataMap,
};

export type ChartMarketUpdateSinglePayload = {
  identifier: ChartDataIdentifier,
  newPx: number,
};

export type ChartMarketUpdatePayload = ChartMarketUpdateSinglePayload[];
