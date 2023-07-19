import {SecurityType} from '@/enums/securityType';
import {ContractId} from '@/types/data/px';


export type ContractDetailsModel = {
  minTick: number,
};

export type ContractModel = {
  id: ContractId,
  securityType: SecurityType,
  exchange: string,
  localSymbol: string,
  multiplier: number,
  details?: ContractDetailsModel,
};

export type ContractInState = ContractModel & {
  initialMargin: number | null,
  maintenanceMargin: number | null,
  digits: number,
};
