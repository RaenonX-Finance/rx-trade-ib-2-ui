import {OptionPxSubscribeRequest} from '@/types/api/px';


export type OptionChainPxSubscribeRequestState = Omit<OptionPxSubscribeRequest, 'strikes'> & {
  strikeRangePercent: number | null,
};
