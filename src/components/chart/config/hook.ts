import {ChartConfigCheckOptions} from '@/components/chart/config/type';
import {ConfigEntries} from '@/components/chart/config/ui/const';
import {
  ChartConfigGroup,
  ChartConfigKeys,
  ChartConfigSingle,
} from '@/components/chart/config/ui/type';
import {useConfigGroupMap} from '@/components/chart/config/utils';


export const useGroupedChartConfigEntries = (opts: ChartConfigCheckOptions): ChartConfigGroup => {
  return useConfigGroupMap<ChartConfigKeys, ChartConfigSingle>(ConfigEntries, opts);
};
