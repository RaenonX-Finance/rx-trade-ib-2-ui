import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {ContractId} from '@/types/data/px';


export const useLastPxUpdateSelector = (contractId: ContractId | undefined): number | undefined => (
  useSelector(({chartMeta}: ReduxState) => !!contractId ? chartMeta.lastPxUpdate[contractId] : undefined)
);

export const useCompletePxUpdateSelector = (contractId: ContractId | undefined): number | undefined => (
  useSelector(({chartMeta}: ReduxState) => !!contractId ? chartMeta.completePxUpdate[contractId] : undefined)
);
