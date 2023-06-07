import {ChartLegendData} from '@/components/chart/type';


export type PxDirectionText = 'up' | 'neutral' | 'down';

export type ChartLegendProps = {
  legend: ChartLegendData,
};

export type ChartLegendOfDataProps<T> = ChartLegendProps & {
  data: T
};
