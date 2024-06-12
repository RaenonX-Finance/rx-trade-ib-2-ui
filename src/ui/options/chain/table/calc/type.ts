import {PxOfContract} from '@/types/data/px';
import {ChangeInfo} from '@/utils/math';
import {Nullable} from '@/utils/type';


export type OptionChainDataOfContract = {
  optionsPx: Nullable<PxOfContract>,
  last: {
    isClose: boolean,
    px: Nullable<number>,
  },
  changeInfo: Nullable<ChangeInfo>,
  dailyLossPercent: Nullable<number>,
  timeNeutralMovementPercent: Nullable<number>,
  spreadPercent: Nullable<number>,
};
