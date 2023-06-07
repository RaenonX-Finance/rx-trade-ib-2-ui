import {AccountDataKey} from '@/enums/accountData';


export type AccountInfoCollection = {[accountNumber in string]?: AccountData};

export type AccountPnL = {
  daily: number,
  unrealized: number,
  realized: number,
};

export type AccountValue = {[dataKey in AccountDataKey]?: string};

export type AccountData = {
  data: AccountValue,
  pnl?: AccountPnL,
  lastUpdatedEpochMs: number,
};
