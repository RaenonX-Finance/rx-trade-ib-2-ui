import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';


export const OPTION_STATE_NAME = 'Option';

export enum OptionDispatcherName {
  CLEAR = 'Option/Clear',
  UPDATE_DEFINITION = 'Option/UpdateDefinition',
  UPDATE_CONTRACT_MAPPING = 'Option/UpdateContractMapping',
}

export type OptionState = {
  definition?: OptionDefinition,
  contractMapping?: OptionContractIdPair[],
};
