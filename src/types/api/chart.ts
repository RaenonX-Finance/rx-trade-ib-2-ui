import {ChartDataInterval} from '@/types/data/chart';


export type ChartDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  diff: number,
};

// HistoryPxRequestForQuote of server
export type ChartHistoryPxRequest = {
  account: string,
  contractId: number,
  symbol: string,
  exchange: string,
  interval: ChartDataInterval,
  rthOnly: boolean,
};
