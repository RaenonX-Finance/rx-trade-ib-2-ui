import {AccountDataKey} from '@/enums/accountData';


export type AccountListMessage = {
  accounts: string[],
};

export type AccountDataUpdateMessage = {
  account: string,
  currency: string,
  key: AccountDataKey,
  value: string,
};
