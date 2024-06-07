import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';

import {ReduxState} from '@/state/types';
import {PositionData} from '@/types/data/positions';
import {Nullable} from '@/utils/type';


export const usePositionSelector = (
  accountNumber: Nullable<string>,
  contractId: Nullable<number>,
): Nullable<PositionData> => (
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

const selectPositionContractIds = (accountNumber: Nullable<string>) => createSelector(
  ({position}: ReduxState) => position,
  (position) => (
    accountNumber ? Object.keys(position[accountNumber] ?? []).map((contractId) => Number(contractId)) : []
  ),
);

export const usePositionContractIdsSelector = (accountNumber: Nullable<string>): number[] => (
  useSelector(selectPositionContractIds(accountNumber))
);

export const useHasPositionSelector = (accountNumber: Nullable<string>, contractId: Nullable<number>): boolean => (
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
