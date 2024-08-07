import {OptionPxQuotes} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';

// Sync with `OptionChainRequest` of the math server
export type OptionPxFromApiRequest = {
  ticker: string,
  spotPx: number,
  avgVolume: number | null,
  rangePercent: number,
  expiryDays: number,
  gexExpiryExclusions: string[],
};

export type OptionPxFromApiResponse = {
  quote: OptionPxQuotes,
  gex: OptionsGexStatsResponse,
};

export type OptionPxFromApiState = {
  loading: boolean,
  response: OptionPxFromApiResponse | null,
  lastFetchEpochMs: number | null,
};
