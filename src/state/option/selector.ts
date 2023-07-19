import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';


export const useOptionDefinitionSelector = (): OptionDefinition | undefined => (
  useSelector(({option}: ReduxState) => option.definition)
);

export const useOptionContractMappingSelector = (): OptionContractIdPair[] | undefined => (
  useSelector(({option}: ReduxState) => option.contractMapping)
);
