import {OptionChainDataSource} from '@/types/data/option';
import {Nullable} from '@/utils/type';


export type OptionPxQuoteOfContract = Partial<{
  ticker: string,
  px: number,
  pxUpdated: number, // Epoch sec
  openInterest: number,
  iv: number,
  delta: number,
  theta: number,
  gamma: number,
  vega: number,
}>;

export type OptionPxContract = {
  call: string | null,
  put: string | null,
  strike: number,
  expiry: string, // YYYY-MM-DD
};

export type OptionPxQuotes = {
  ticker: string,
  spotPx: number,
  optionPx: {[ticker in string]: OptionPxQuoteOfContract},
  contracts: OptionPxContract[],
};

export type OptionPxQuoteRequest = {
  source: OptionChainDataSource,
  rangePercent: number,
  expiryDays: number,
  ticker?: string,
  spotPx?: Nullable<number>, // Effective only when `source` is `api`
};
