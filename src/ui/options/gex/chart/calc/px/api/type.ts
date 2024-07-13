import {OptionPxQuotes} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';

// Sync with `OptionChainRequest` of the math server
export type OptionPxFromApiRequest = {
  ticker: string,
  spotPx: number,
  rangePercent: number,
  expiryDays: number,
};

export type OptionPxFromApiResponse = {
  quote: OptionPxQuotes,
  gex: OptionsGexStatsResponse,
};

export type OptionPxFromApiState = {
  loading: boolean,
  response: OptionPxFromApiResponse | null,
};
