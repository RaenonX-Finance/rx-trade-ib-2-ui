import {PxOfContract} from '@/types/data/px';
import {Nullable} from '@/utils/type';


export const getPx = (px: Nullable<PxOfContract>): number => {
  return px?.Last ?? px?.Mark ?? 0;
};
