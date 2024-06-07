import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {PartialNullable} from '@/utils/type';


export const OPTION_STATE_NAME = 'Option';

export enum OptionDispatcherName {
  CHAIN_CLEAR = 'Option/ChainClear',
  CHAIN_UPDATE_DEFINITION = 'Option/ChainUpdateDefinition',
  CHAIN_UPDATE_CONTRACT_MAPPING = 'Option/ChainUpdateContractMapping',
}

export type OptionMetaOfType = PartialNullable<{
  definition: OptionDefinition,
  contracts: OptionContractIdPair[],
}>;

export type OptionState = PartialNullable<{
  chain: OptionMetaOfType,
  gex: OptionMetaOfType,
}>;
