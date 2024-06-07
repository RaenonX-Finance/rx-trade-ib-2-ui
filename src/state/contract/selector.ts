import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {ContractInState} from '@/types/data/contract';
import {ContractId} from '@/types/data/px';
import {Nullable} from '@/utils/type';


export const useContractSelector = (contractId: Nullable<ContractId>): Nullable<ContractInState> => (
  useSelector(({contract}: ReduxState) => !!contractId ? contract[contractId] : undefined)
);
