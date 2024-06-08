import {OptionPxSubscribeRequest} from '@/types/api/px';


export type OptionGexPxSubscribeRequestState = Omit<OptionPxSubscribeRequest, 'strikes' | 'expiry'> & {
  // `null` means unlimited expiry dates
  expiryMaxDays: number | null,
};
