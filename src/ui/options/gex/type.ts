import {OptionPxRequest} from '@/types/api/px';
import {OptionChainDataSource} from '@/types/data/option';


export type OptionGexPxSubscribeRequestState = Omit<OptionPxRequest, 'strikes' | 'expiry'> & {
  // `null` means to use the spot Px from the API
  spotPxOverride: number | null,
  // `null` means unlimited expiry dates
  expiryMaxDays: number | null,
  // `null` means to use the default value
  rangePercent: number | null,
  source: OptionChainDataSource,
};
