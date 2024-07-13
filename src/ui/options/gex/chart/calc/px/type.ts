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
  ticker?: string,
  spotPx?: Nullable<number>, // Effective only when `NEXT_PUBLIC_OPTION_CHAIN_SOURCE` is API
  rangePercent: number,
  expiryDays: number,
};
