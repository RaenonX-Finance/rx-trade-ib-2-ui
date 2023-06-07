import {ChartConfigUiEntries} from '@/components/chart/config/ui/type';


export const ConfigEntries: ChartConfigUiEntries = {
  showAsLine: {
    group: 'Style',
    title: 'As Line',
  },
  lineOfCurrentPx: {
    group: 'Lines',
    title: 'Current Px',
  },
  lineOfPositionAvgPx: {
    group: 'Lines',
    title: 'Position Avg Px',
  },
  lineOfExtrema: {
    group: 'Lines',
    title: 'Extrema',
    isHidden: ({simplified}) => simplified,
  },
};
