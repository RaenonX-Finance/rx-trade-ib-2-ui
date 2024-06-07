import {PxOfContract} from '@/types/data/px';
import {Nullable} from '@/utils/type';


export const getMidPx = (px: Nullable<PxOfContract>): number | null => {
  if (!px || px.Bid === undefined || px.Ask === undefined) {
    return null;
  }

  return (px.Bid + px.Ask) / 2;
};
