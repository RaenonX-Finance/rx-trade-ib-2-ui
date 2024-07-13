import React from 'react';

import {OptionPxQuoteRequest} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';
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

export type OptionsGexCalcControl = {
  result: OptionsGexCalcResult,
  gex: Nullable<OptionsGexStatsResponse>,
  inactiveExpiry: Record<string, boolean>,
  setInactiveExpiry: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
};

export type OptionsGexCalcCommonOpts = {
  active: boolean,
  request: Nullable<OptionPxQuoteRequest>,
};
