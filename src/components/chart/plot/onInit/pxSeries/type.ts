import {LineSeriesPartialOptions} from 'lightweight-charts';

import {ChartConfigBoolValKeys} from '@/components/chart/config/ui/type';
import {ValidKeyForLineData} from '@/components/chart/convert/type';
import {ChartInitPayload} from '@/components/chart/type';


export type AddPxLineOptionsFromInitEvent = Pick<
  ChartInitPayload,
  'chartRef' | 'chartDataRef' | 'chartConfig' | 'contract' | 'simplified'
>;

export type AddPxLineOptions =
  AddPxLineOptionsFromInitEvent &
  LineSeriesPartialOptions & {
    keyOfConfig: ChartConfigBoolValKeys,
    keyForLineData: ValidKeyForLineData,
  };
