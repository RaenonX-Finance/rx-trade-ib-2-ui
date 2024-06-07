import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {PartialNullable} from '@/utils/type';


export const OPTION_STATE_NAME = 'Option';

export enum OptionDispatcherName {
  UPDATE_DEFINITION = 'Option/UpdateDefinition',
  UPDATE_CONTRACTS = 'Option/UpdateContracts',
  CHAIN_CLEAR = 'Option/ChainClear',
}

export type OptionMetaOfType = PartialNullable<{
  definition: OptionDefinition,
  contracts: OptionContractIdPair[],
}>;

export type OptionState = PartialNullable<{
  chain: OptionMetaOfType,
  gex: OptionMetaOfType,
}>;
