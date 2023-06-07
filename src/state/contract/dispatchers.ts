import {createAction} from '@reduxjs/toolkit';

import {ContractDispatcherName} from '@/state/contract/types';
import {MarginInfoMessage} from '@/types/api/info';
import {ContractModel} from '@/types/data/contract';


export const contractDispatchers = {
  [ContractDispatcherName.RECORD_MODELS]: createAction<ContractModel[]>(ContractDispatcherName.RECORD_MODELS),
  [ContractDispatcherName.UPDATE_MARGIN]: createAction<MarginInfoMessage>(ContractDispatcherName.UPDATE_MARGIN),
};
