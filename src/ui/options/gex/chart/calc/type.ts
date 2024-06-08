export type OptionsGexNetGamma = {
  call: number,
  put: number,
  total: number,
};

export type OptionsGexData = {
  strike: number,
  netGammaSum: OptionsGexNetGamma,
  netGammaByExpiry: {[expiry in string]?: OptionsGexNetGamma},
};

export type OptionsGexCalcResult = {
  byStrike: OptionsGexData[],
  possibleExpiry: string[],
  total: number,
};
