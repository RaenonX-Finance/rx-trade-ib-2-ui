import {ChartConfigKeys, ChartConfigSingle} from '@/components/chart/config/ui/type';
import {getDefaultConfig} from '@/state/chartConfig/const';


type GetChartConfigOpts<K extends ChartConfigKeys> = {
  config: ChartConfigSingle,
  key: K,
  simplified: boolean,
};

export const getChartConfig = <K extends ChartConfigKeys>({
  config,
  key,
  simplified,
}: GetChartConfigOpts<K>): ChartConfigSingle[K] => {
  return config[key] ?? getDefaultConfig(simplified)[key];
};
