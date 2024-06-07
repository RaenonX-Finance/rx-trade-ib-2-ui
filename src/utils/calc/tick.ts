import {PxOfContract} from '@/types/data/px';
import {Nullable} from '@/utils/type';


export const getMidPx = (px: Nullable<PxOfContract>): number | null => {
  if (!px || px.Bid === undefined || px.Ask === undefined) {
    return null;
  }

  return (px.Bid + px.Ask) / 2;
};

export const getPxSpread = (px: Nullable<PxOfContract>): number | null => {
  if (!px || px.Bid === undefined || px.Ask === undefined) {
    return null;
  }

  return Math.abs(px.Bid - px.Ask);
};

export const getOptionsOi = (px: Nullable<PxOfContract>): number | null => {
  return px?.OptionCallOpenInterest ?? px?.OptionPutOpenInterest ?? null;
};
