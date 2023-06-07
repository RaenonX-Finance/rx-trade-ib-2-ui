import {BarsInfo} from 'lightweight-charts';

import {ChartInitPayload} from '@/components/chart/type';


export type HandleXrangeChangeOpts = {
  e: ChartInitPayload,
  barsInfo: BarsInfo | null,
};
