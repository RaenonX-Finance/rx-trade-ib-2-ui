import {PxOfContract} from '@/types/data/px';
import {ChangeInfo, getChange} from '@/utils/math';


export const getDailyChange = (px: PxOfContract | undefined): ChangeInfo | undefined => {
  return getChange({original: px?.Close, after: px?.Last});
};
