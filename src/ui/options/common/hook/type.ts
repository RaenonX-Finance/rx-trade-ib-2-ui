import {OptionPxResponse} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {Nullable} from '@/utils/type';


export type UseOptionPxSubscriberCommonOpts = {
  definition: Nullable<OptionDefinition>,
  onRequestedPx: (response: OptionPxResponse) => void,
};
