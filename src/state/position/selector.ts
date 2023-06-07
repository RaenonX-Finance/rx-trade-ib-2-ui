import {useSelector} from 'react-redux';

import {PositionData} from '@/types/data/positions';

import {ReduxState} from '../types';


export const usePositionSelector = (
  accountNumber: string | undefined,
  contractId: number | undefined,
): PositionData | undefined => (
  useSelector(({position}: ReduxState) => {
    if (!accountNumber || !contractId) {
      return undefined;
    }

    const positionsOfAccount = position[accountNumber];
    if (!positionsOfAccount) {
      return undefined;
    }

    return positionsOfAccount[contractId];
  })
);

export const usePositionContractIdsSelector = (accountNumber: string | undefined): number[] => (
  useSelector(({position}: ReduxState) => (
    accountNumber ? Object.keys(position[accountNumber] ?? []).map((contractId) => Number(contractId)) : []
  ))
);

export const useHasPositionSelector = (accountNumber: string | undefined, contractId: number | undefined): boolean => (
  useSelector(({position}: ReduxState) => {
    if (!accountNumber || !contractId) {
      return false;
    }

    const positionsOfAccount = position[accountNumber];
    if (!positionsOfAccount) {
      return false;
    }

    return (positionsOfAccount[contractId]?.quantity ?? 0) > 0;
  })
);
