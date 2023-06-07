import {useSelector} from 'react-redux';

import {AccountDataKey} from '@/enums/accountData';
import {AccountData} from '@/types/data/account';

import {ReduxState} from '../types';


export const useAccountDataSelector = (accountNumber: string | undefined): AccountData | undefined => (
  useSelector(({account}: ReduxState) => accountNumber ? account.info[accountNumber] : undefined)
);

export const useAccountValueSelector = (
  accountNumber: string | undefined,
  valueKey: AccountDataKey,
): number | undefined => (
  useSelector(({account}: ReduxState) => {
    if (!accountNumber || !valueKey) {
      return undefined;
    }

    const accountData = account.info[accountNumber];
    if (!accountData) {
      return undefined;
    }

    const value = Number(accountData.data[valueKey]);

    return isNaN(value) ? undefined : value;
  })
);

export const useCurrentAccountSelector = (): string | undefined => (
  useSelector(({account}: ReduxState) => account.list[account.currentAccountIndex])
);

export const useAccountListSelector = (): string[] => (
  useSelector(({account}: ReduxState) => account.list)
);

export const useAccountTotalPnlSelector = (accountNumber: string | undefined): number | undefined => (
  useSelector(({account}: ReduxState) => {
    if (!accountNumber) {
      return undefined;
    }

    const accountData = account.info[accountNumber];
    if (!accountData || !accountData.pnl) {
      return undefined;
    }

    const {realized, unrealized} = accountData.pnl;

    return realized + unrealized;
  })
);

export const useAccountDailyPnlSelector = (accountNumber: string | undefined): number | undefined => (
  useSelector(({account}: ReduxState) => {
    if (!accountNumber) {
      return undefined;
    }

    const accountData = account.info[accountNumber];
    if (!accountData || !accountData.pnl) {
      return undefined;
    }

    return accountData.pnl.daily;
  })
);
