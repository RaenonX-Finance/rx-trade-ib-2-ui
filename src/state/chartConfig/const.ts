import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {ChartDataRequest} from '@/ui/px/type';


const defaultChartConfigSimplified: ChartConfigSingle = {
  showAsLine: true,
  lineOfCurrentPx: false,
  lineOfPositionAvgPx: true,
  lineOfExtrema: false,
};

const defaultChartConfigComplete: ChartConfigSingle = {
  showAsLine: false,
  lineOfCurrentPx: true,
  lineOfPositionAvgPx: true,
  lineOfExtrema: true,
};

export const getDefaultConfig = (simplified: boolean): ChartConfigSingle => {
  return simplified ? defaultChartConfigSimplified : defaultChartConfigComplete;
};

export const defaultChartRequest: ChartDataRequest = {
  symbol: '',
  interval: '3m',
  rthOnly: false,
};
