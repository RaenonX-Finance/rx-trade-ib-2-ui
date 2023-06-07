import {createAction} from '@reduxjs/toolkit';

import {OptionDispatcherName} from '@/state/option/types';
import {OptionContractIdPair, OptionDefinitionMessage} from '@/types/api/option';


export const optionDispatchers = {
  [OptionDispatcherName.UPDATE_DEFINITION]: createAction<OptionDefinitionMessage>(
    OptionDispatcherName.UPDATE_DEFINITION,
  ),
  [OptionDispatcherName.UPDATE_CONTRACT_MAPPING]: createAction<OptionContractIdPair[]>(
    OptionDispatcherName.UPDATE_CONTRACT_MAPPING,
  ),
  [OptionDispatcherName.CLEAR]: createAction(OptionDispatcherName.CLEAR),
};
