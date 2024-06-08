import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {PartialNullable} from '@/utils/type';


export const OPTION_STATE_NAME = 'Option';

export enum OptionDispatcherName {
  UPDATE_DEFINITION = 'Option/UpdateDefinition',
  UPDATE_CONTRACTS = 'Option/UpdateContracts',
  CLEAR_OPTION_CHAIN = 'Option/Clear/OptionChain',
  CLEAR_OPTION_GEX = 'Option/Clear/Gex',
}

export type OptionMetaOfType = PartialNullable<{
  definition: OptionDefinition,
  contracts: OptionContractIdPair[],
}>;

export type OptionState = PartialNullable<{
  chain: OptionMetaOfType,
  gex: OptionMetaOfType,
}>;
