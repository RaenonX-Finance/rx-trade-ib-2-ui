import {ActionCreatorWithoutPayload} from '@reduxjs/toolkit';

import {OptionDispatcherName} from '@/state/option/types';
import {OptionPxRequestOrigin, OptionPxRequestType} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {Nullable} from '@/utils/type';


export type UseOptionPxManagerCommonOpts = {
  origin: OptionPxRequestOrigin,
  type: OptionPxRequestType,
  definition: Nullable<OptionDefinition>,
  clearAction: ActionCreatorWithoutPayload<
    OptionDispatcherName.CLEAR_OPTION_CHAIN |
    OptionDispatcherName.CLEAR_OPTION_GEX
  >,
};

export type SubscribeOptionPxRequestOpts<TPayload> = {
  payload: TPayload,
  realtimeRequestIdsToCancel?: Nullable<number[]>,
};
