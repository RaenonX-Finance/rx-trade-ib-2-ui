import {ChartConfigEntriesGroup, ChartConfigUI} from '@/components/chart/config/type';
import {KeysOfType} from '@/utils/type';


export type ChartConfigSingle = {
  // Style
  showAsLine: boolean,
  // Marks
  lineOfCurrentPx: boolean,
  lineOfPositionAvgPx: boolean,
  lineOfExtrema: boolean,
  // Actions
  isAutoFixRange: boolean,
};

export type ChartConfigKeys = keyof ChartConfigSingle;

export type ChartConfigBoolValKeys = KeysOfType<ChartConfigSingle, boolean>;

export type ChartConfigUiEntries = ChartConfigUI<ChartConfigKeys, string, ChartConfigSingle>;

export type ChartConfigGroup = ChartConfigEntriesGroup<ChartConfigKeys, string, ChartConfigSingle>;
