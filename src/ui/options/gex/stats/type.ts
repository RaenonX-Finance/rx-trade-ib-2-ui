// These are synced with the typings in `rx-trade-ib-2-math`

export type OptionsGexPriceData = {
  expiry: string, // Should be in the format of YYYYMMDD
  strike: number,
  callIv: number,
  callGamma: number,
  callOi: number,
  putIv: number,
  putGamma: number,
  putOi: number,
};

export type OptionsGexStatsRequest = {
  spotPrice: number,
  avgVolume: number | null,
  optionsPrice: OptionsGexPriceData[],
  expiryExclusions: string[],
};

export type OptionsGexStatsState = {
  response: OptionsGexStatsResponse | null,
  loading: boolean,
};

export type OptionsGexStatsResponse = {
  gammaField: number | null,
  gammaFlip: number[],
  effectiveness: number | null,
};
