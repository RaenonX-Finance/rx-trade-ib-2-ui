import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {ContractId, PxOfContract} from '@/types/data/px';


export const usePxSelector = (contractId: ContractId | undefined): PxOfContract | undefined => (
  useSelector(({px}: ReduxState) => contractId ? px[contractId] : undefined)
);
