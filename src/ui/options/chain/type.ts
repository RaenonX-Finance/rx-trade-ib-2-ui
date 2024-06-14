import {OptionPxRequest} from '@/types/api/px';


export type OptionChainPxSubscribeRequestState = Omit<OptionPxRequest, 'strikes'> & {
  strikeRangePercent: number | null,
};
