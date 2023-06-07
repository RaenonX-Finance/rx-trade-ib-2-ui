import {useSelector} from 'react-redux';

import {OrderOfAccount} from '@/types/data/order';

import {ReduxState} from '../types';


export const useOpenOrderSelector = (accountNumber: string | undefined): OrderOfAccount | undefined => (
  useSelector(({order}: ReduxState) => accountNumber ? order.open[accountNumber] : undefined)
);

export const useFilledOrderSelector = (accountNumber: string | undefined): OrderOfAccount | undefined => (
  useSelector(({order}: ReduxState) => accountNumber ? order.filled[accountNumber] : undefined)
);

export const useCancelledOrderSelector = (accountNumber: string | undefined): OrderOfAccount | undefined => (
  useSelector(({order}: ReduxState) => accountNumber ? order.cancelled[accountNumber] : undefined)
);
