import {ContractModel} from '@/types/data/contract';


export type PositionUpdateMessage = {
  account: string,
  contract: ContractModel,
  quantity: number,
  avgPx: number,
  unrealizedPnl: number,
  marketValue: number,
};
