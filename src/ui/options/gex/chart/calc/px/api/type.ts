import {OptionPxQuotes} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';

// Sync with `OptionChainRequest` of the calc server
export type OptionChainApiRequest = {
  ticker: string,
  spotPx: number,
  rangePercent: number,
  expiryDays: number,
};

export type OptionChainApiResponse = {
  quote: OptionPxQuotes,
  gex: OptionsGexStatsResponse,
};
