import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {ContractId, PxOfContract} from '@/types/data/px';
import {Nullable} from '@/utils/type';


export const usePxSelector = (contractId: Nullable<ContractId>): Nullable<PxOfContract> => (
  useSelector(({px}: ReduxState) => contractId ? px[contractId] : null)
);
