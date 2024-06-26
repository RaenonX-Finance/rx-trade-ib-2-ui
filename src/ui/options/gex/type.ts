import {OptionPxRequest} from '@/types/api/px';


export type OptionGexPxSubscribeRequestState = Omit<OptionPxRequest, 'strikes' | 'expiry'> & {
  // `null` means unlimited expiry dates
  expiryMaxDays: number | null,
  // `null` means to use the default value
  rangePercent: number | null,
};
