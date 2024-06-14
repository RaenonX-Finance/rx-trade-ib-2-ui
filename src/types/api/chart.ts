import {ChartDataInterval} from '@/types/data/chart';


export type ChartDataBarBase = {
  epochSec: number,
};

export type ChartDataBarWithData = ChartDataBarBase & {
  open: number,
  high: number,
  low: number,
  close: number,
  diff: number,
};

export type ChartDataBarNoData = ChartDataBarBase & {
  open: null,
  high: null,
  low: null,
  close: null,
  diff: null,
};

export type ChartDataBar = ChartDataBarWithData | ChartDataBarNoData;

export const isChartDataBarWithData = (bar: ChartDataBar): bar is ChartDataBarWithData => bar.open !== null;

// `PxHistoryRequest` of server
export type ChartHistoryPxRequest = {
  account: string,
  contractId: number,
  symbol: string,
  exchange: string,
  interval: ChartDataInterval,
  rthOnly: boolean,
};
