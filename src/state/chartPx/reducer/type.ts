import {PxHistoryMessage} from '@/types/api/px';
import {ChartDataIdentifier} from '@/types/data/chart';


export type ChartUpdatePayload<T extends PxHistoryMessage> = {
  identifier: ChartDataIdentifier,
  data: T | null,
};
