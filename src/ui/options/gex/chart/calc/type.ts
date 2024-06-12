import {Nullable} from '@/utils/type';


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
  closestStrike: Nullable<number>,
  // `possible` means the contract received for showing the related stats
  possibleExpiry: string[],
  total: number,
};
