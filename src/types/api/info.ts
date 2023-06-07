import {ContractId} from '@/types/data/px';


export type MarginInfoMessage = {
  contractId: ContractId,
  initialMargin: number,
  maintenanceMargin: number
};
