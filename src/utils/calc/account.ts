import {AccountData} from '@/types/data/account';


export const getPreviousDayValue = (accountData: AccountData): number | undefined => {
  const {NetLiquidation} = accountData.data;

  const accountValue = Number(NetLiquidation);

  if (isNaN(accountValue) || !accountData.pnl) {
    return undefined;
  }

  return accountValue - accountData.pnl.daily;
};
