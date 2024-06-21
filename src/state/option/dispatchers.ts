import {createAction} from '@reduxjs/toolkit';

import {OptionDispatcherName} from '@/state/option/types';
import {OptionDefinitionMessage, OptionPxRequestOrigin, OptionPxResponse} from '@/types/api/option';


export const optionDispatchers = {
  [OptionDispatcherName.UPDATE_DEFINITION]: createAction<OptionDefinitionMessage>(
    OptionDispatcherName.UPDATE_DEFINITION,
  ),
  [OptionDispatcherName.UPDATE_CONTRACTS]: createAction<OptionPxResponse>(
    OptionDispatcherName.UPDATE_CONTRACTS,
  ),
  [OptionDispatcherName.RESET_CONTRACTS]: createAction<OptionPxRequestOrigin>(
    OptionDispatcherName.RESET_CONTRACTS,
  ),
  [OptionDispatcherName.RESET_REALTIME_REQUESTS]: createAction<OptionPxRequestOrigin>(
    OptionDispatcherName.RESET_REALTIME_REQUESTS,
  ),
  [OptionDispatcherName.GEX_SET_EXPECTED_EXPIRY]: createAction<string[]>(
    OptionDispatcherName.GEX_SET_EXPECTED_EXPIRY,
  ),
  [OptionDispatcherName.CLEAR_OPTION_CHAIN]: createAction(OptionDispatcherName.CLEAR_OPTION_CHAIN),
  [OptionDispatcherName.CLEAR_OPTION_GEX]: createAction(OptionDispatcherName.CLEAR_OPTION_GEX),
};
