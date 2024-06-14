import {Nullable} from '@/utils/type';


export type OptionsGexDataOfPair = {
  call: number,
  put: number,
  total: number,
};

export type OptionsGexDataByExpiry = {[expiry in string]?: OptionsGexDataOfPair};

export type OptionsGexData = {
  strike: number,
  netGammaSum: OptionsGexDataOfPair,
  netGammaByExpiry: OptionsGexDataByExpiry,
  oi: OptionsGexDataOfPair,
  oiByExpiry: OptionsGexDataByExpiry,
};

export type OptionsGexCalcResult = {
  byStrike: OptionsGexData[],
  closestStrike: Nullable<number>,
  // `possible` means the contract received for showing the related stats
  possibleExpiry: string[],
  total: number,
};
