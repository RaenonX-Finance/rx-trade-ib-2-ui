import {AccountDataKey} from '@/enums/accountData';


export const AccountDataKeyTranslation: {[key in AccountDataKey]: string} = {
  AvailableFunds: 'Balance (T)',
  AvailableFundsC: 'Balance (C)',
  AvailableFundsS: 'Balance (S)',
  DayTradesRemaining: 'DT# (0)',
  DayTradesRemainingT1: 'DT# (1)',
  DayTradesRemainingT2: 'DT# (2)',
  DayTradesRemainingT3: 'DT# (3)',
  DayTradesRemainingT4: 'DT# (4)',
  NetLiquidation: 'Total Value (T)',
  NetLiquidationC: 'Total Value (C)',
  NetLiquidationS: 'Total Value (S)',
};
