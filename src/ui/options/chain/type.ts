import {OptionChainPxSubscribeRequest} from '@/types/api/px';


export type OptionChainPxSubscribeRequestState = Omit<OptionChainPxSubscribeRequest, 'strikes'> & {
  strikeRangePercent: number | null,
};
