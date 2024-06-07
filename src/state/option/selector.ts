import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {Nullable} from '@/utils/type';


export const useOptionDefinitionSelector = (): Nullable<OptionDefinition> => (
  useSelector(({option}: ReduxState) => option.definition)
);

export const useOptionContractMappingSelector = (): OptionContractIdPair[] => (
  useSelector(({option}: ReduxState) => option.contractMapping ?? [])
);
