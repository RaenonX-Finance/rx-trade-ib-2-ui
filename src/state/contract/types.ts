import {ContractInState} from '@/types/data/contract';
import {ContractId} from '@/types/data/px';


export const CONTRACT_STATE_NAME = 'Contract';

export enum ContractDispatcherName {
  RECORD_MODELS = 'Contract/RecordModels',
  UPDATE_MARGIN = 'Contract/UpdateMargin',
}

export type ContractState = {[contractId in ContractId]?: ContractInState};
