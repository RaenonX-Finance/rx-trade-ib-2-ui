import {createAction} from '@reduxjs/toolkit';

import {OptionDispatcherName} from '@/state/option/types';
import {OptionDefinitionMessage, OptionPxResponse} from '@/types/api/option';


export const optionDispatchers = {
  [OptionDispatcherName.UPDATE_DEFINITION]: createAction<OptionDefinitionMessage>(
    OptionDispatcherName.UPDATE_DEFINITION,
  ),
  [OptionDispatcherName.UPDATE_CONTRACTS]: createAction<OptionPxResponse>(
    OptionDispatcherName.UPDATE_CONTRACTS,
  ),
  [OptionDispatcherName.CLEAR_OPTION_CHAIN]: createAction(OptionDispatcherName.CLEAR_OPTION_CHAIN),
  [OptionDispatcherName.CLEAR_OPTION_GEX]: createAction(OptionDispatcherName.CLEAR_OPTION_GEX),
};
