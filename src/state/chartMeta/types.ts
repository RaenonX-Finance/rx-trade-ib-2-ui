import {ContractId} from '@/types/data/px';


export const CHART_META_STATE_NAME = 'ChartMeta';

export type ChartMetaState = {
  lastPxUpdate: {[contractId in ContractId]?: number},
  completePxUpdate: {[contractId in ContractId]?: number},
};
