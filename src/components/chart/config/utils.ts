import React from 'react';

import {
  ChartConfigCheckOptions,
  ChartConfigEntriesGroup,
  ChartConfigEntry,
  ChartConfigUI,
} from '@/components/chart/config/type';


export const useConfigGroupMap = <K extends keyof T, T>(
  configEntries: ChartConfigUI<K, string, T>,
  opts: ChartConfigCheckOptions,
): ChartConfigEntriesGroup<K, string, T> => {
  const [configEntriesGroup, setConfigEntriesGroup] = React.useState<ChartConfigEntriesGroup<K, string, T>>({});

  React.useEffect(() => {
    const entriesGroup: ChartConfigEntriesGroup<K, string, T> = {};

    Object.entries(configEntries).forEach(([key, entry]) => {
      const configEntry = entry as ChartConfigEntry<string>;

      const {group, isHidden} = configEntry;

      if (isHidden && isHidden(opts)) {
        return;
      }

      entriesGroup[group] = {
        ...(entriesGroup[group] || {}),
        [key]: configEntry,
      };
    });

    setConfigEntriesGroup(entriesGroup);
  }, [opts]);

  return configEntriesGroup;
};
