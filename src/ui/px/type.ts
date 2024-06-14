import {ChartHistoryPxRequest} from '@/types/api/chart';


export type ChartDataRequest = Pick<ChartHistoryPxRequest, 'symbol' | 'interval' | 'rthOnly'>;

export type LockedContractState = {
  contractId: number | null,
  requested: (ChartDataRequest & {requestId: number}) | null,
  failed: boolean,
};
