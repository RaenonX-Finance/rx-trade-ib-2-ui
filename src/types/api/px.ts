import {HistoryDataType} from '@/enums/historyDataType';
import {PxTick} from '@/enums/pxTick';
import {ChartDataBar} from '@/types/api/chart';
import {ChartDataInterval} from '@/types/data/chart';
import {ContractId} from '@/types/data/px';


export type PxTickRequest = {
  account: string,
  contractId: ContractId,
};

export type PxUpdateMessage = {
  contractId: ContractId,
  update: {[tick in PxTick]?: number},
};

// IbApiHistoryPxRequestMeta of server
export type PxHistoryMeta = {
  contractId: number,
  interval: ChartDataInterval,
  dataType: HistoryDataType,
  isSubscription: boolean,
};

export type PxHistoryMessage = {
  meta: PxHistoryMeta,
  bars: ChartDataBar[],
};

export type OptionPxSubscribeRequest = {
  account: string,
  symbol: string,
  expiry: string,
  tradingClass: string,
  strikes: number[],
};
