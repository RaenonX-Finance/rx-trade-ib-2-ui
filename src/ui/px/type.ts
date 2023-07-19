import {ChartHistoryPxRequest} from '@/types/api/chart';


export type ChartDataRequest = Pick<ChartHistoryPxRequest, 'symbol' | 'interval' | 'rthOnly'>;

export type LockedContractState = {
  contractId: number | undefined,
  requested: (ChartDataRequest & {requestId: number}) | undefined,
  failed: boolean,
};
