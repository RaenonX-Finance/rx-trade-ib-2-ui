import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {ContractInState} from '@/types/data/contract';
import {ContractId} from '@/types/data/px';


export const useContractSelector = (contractId: ContractId | undefined): ContractInState | undefined => (
  useSelector(({contract}: ReduxState) => !!contractId ? contract[contractId] : undefined)
);
