import {ChartDataBarWithData} from '@/types/api/chart';


export const updateChartDataBar = (bar: ChartDataBarWithData, latestPx: number): ChartDataBarWithData => {
  return {
    ...bar,
    high: Math.max(bar.high, latestPx),
    low: Math.min(bar.low, latestPx),
    close: latestPx,
    diff: latestPx - bar.open,
  };
};
