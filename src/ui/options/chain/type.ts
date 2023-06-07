import {OptionPxSubscribeRequest} from '@/types/api/px';


export type OptionPxSubscribeRequestState = Omit<OptionPxSubscribeRequest, 'strikes'> & {
  strikeRange: number,
};
