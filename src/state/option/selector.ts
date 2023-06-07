import {useSelector} from 'react-redux';

import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';

import {ReduxState} from '../types';


export const useOptionDefinitionSelector = (): OptionDefinition | undefined => (
  useSelector(({option}: ReduxState) => option.definition)
);

export const useOptionContractMappingSelector = (): OptionContractIdPair[] | undefined => (
  useSelector(({option}: ReduxState) => option.contractMapping)
);
