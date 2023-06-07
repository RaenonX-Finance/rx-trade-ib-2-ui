import {ChartDataBar} from '@/types/api/chart';


export const updateChartDataBar = (bar: ChartDataBar, latestPx: number): ChartDataBar => {
  return {
    ...bar,
    high: Math.max(bar.high, latestPx),
    low: Math.min(bar.low, latestPx),
    close: latestPx,
    diff: latestPx - bar.open,
  };
};
