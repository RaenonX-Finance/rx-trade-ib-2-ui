export type PxTick =
  'Bid' |
  'Ask' |
  'Last' |
  'Mark' |
  'Close' |
  'OptionCallOpenInterest' |
  'OptionPutOpenInterest' |
  // Stocks only
  'AverageVolume' |
  // Options only
  'Delta' |
  'Theta' |
  'Gamma' |
  'Vega' |
  'OptionsUnderlyingPx' |
  'PvDividend' |
  'ImpliedVolatility';
