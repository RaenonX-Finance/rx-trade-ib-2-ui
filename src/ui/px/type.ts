import {ChartHistoryPxRequest} from '@/types/api/chart';
import {TailwindColorLevel, TailwindColorTheme} from '@/types/tailwind';


export type ChartDataRequest = Pick<ChartHistoryPxRequest, 'symbol' | 'interval' | 'rthOnly'>;

export type LockedContractState = {
  contractId: number | undefined,
  requested: (ChartDataRequest & {requestId: number}) | undefined,
  failed: boolean,
};

export type ChartInputBoxStyling =
  `from-${TailwindColorTheme}-${TailwindColorLevel} to-${TailwindColorTheme}-${TailwindColorLevel}`;
