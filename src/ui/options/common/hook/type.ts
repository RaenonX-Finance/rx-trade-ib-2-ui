import {ActionCreatorWithoutPayload} from '@reduxjs/toolkit';

import {OptionDispatcherName} from '@/state/option/types';
import {OptionPxRequestOrigin} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {Nullable} from '@/utils/type';


export type UseOptionPxManagerCommonOpts = {
  origin: OptionPxRequestOrigin,
  definition: Nullable<OptionDefinition>,
  clearAction: ActionCreatorWithoutPayload<
    OptionDispatcherName.CLEAR_OPTION_CHAIN |
    OptionDispatcherName.CLEAR_OPTION_GEX
  >,
};
