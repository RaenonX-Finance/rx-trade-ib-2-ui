import {AccountInfoCollection} from '@/types/data/account';


export const ACCOUNT_STATE_NAME = 'Account';

export enum AccountDispatcherName {
  SET_LIST = 'Account/SetList',
  SET_ACCOUNT = 'Account/SetAccount',
  PNL_UPDATE = 'Account/PnlUpdate',
  DATA_UPDATE = 'Account/DataUpdate',
}

export type AccountState = {
  info: AccountInfoCollection,
  currentAccountIndex: number,
  list: string[],
};
