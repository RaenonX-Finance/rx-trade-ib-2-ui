import {createAction} from '@reduxjs/toolkit';

import {OptionDispatcherName} from '@/state/option/types';
import {OptionContractIdPair, OptionDefinitionMessage} from '@/types/api/option';


export const optionDispatchers = {
  [OptionDispatcherName.CHAIN_UPDATE_DEFINITION]: createAction<OptionDefinitionMessage>(
    OptionDispatcherName.CHAIN_UPDATE_DEFINITION,
  ),
  [OptionDispatcherName.CHAIN_UPDATE_CONTRACTS]: createAction<OptionContractIdPair[]>(
    OptionDispatcherName.CHAIN_UPDATE_CONTRACTS,
  ),
  [OptionDispatcherName.CHAIN_CLEAR]: createAction(OptionDispatcherName.CHAIN_CLEAR),
};
