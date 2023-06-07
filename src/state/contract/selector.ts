import {useSelector} from 'react-redux';

import {ContractInState} from '@/types/data/contract';
import {ContractId} from '@/types/data/px';

import {ReduxState} from '../types';


export const useContractSelector = (contractId: ContractId | undefined): ContractInState | undefined => (
  useSelector(({contract}: ReduxState) => !!contractId ? contract[contractId] : undefined)
);
