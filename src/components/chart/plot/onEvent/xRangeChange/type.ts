import {BarsInfo, Time} from 'lightweight-charts';

import {ChartInitPayload} from '@/components/chart/type';


export type HandleXrangeChangeOpts = {
  e: ChartInitPayload,
  barsInfo: BarsInfo<Time> | null,
};
