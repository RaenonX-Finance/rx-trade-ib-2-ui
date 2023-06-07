import {ContractId} from '@/types/data/px';


export type PnlRequest = {
  account: string,
  contractId: ContractId,
};

export type AccountPnlUpdateMessage = {
  account: string,
  dailyPnl: number,
  unrealizedPnl: number,
  realizedPnl: number,
};

export type PositionPnlUpdateMessage = {
  account: string,
  contractId: ContractId,
  quantity: number,
  dailyPnl: number,
  unrealizedPnl: number,
  realizedPnl: number,
  marketValue: number,
};
