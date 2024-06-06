import React from 'react';

import {clsx} from 'clsx';

import {useGroupedChartConfigEntries} from '@/components/chart/config/hook';
import {ChartConfigPanelProps} from '@/components/chart/config/ui/main';
import {ChartConfigKeys, ChartConfigSingle} from '@/components/chart/config/ui/type';
import {ToggleButton} from '@/components/inputs/toggleButton';
import {getChartConfig} from '@/state/chartConfig/utils';


type Props = Pick<ChartConfigPanelProps, 'config' | 'configCheckOptions'> & {
  updateConfig: (
    configKey: ChartConfigKeys,
    value: ChartConfigSingle[ChartConfigKeys]
  ) => void,
};

export const ChartConfigEntries = ({config, updateConfig, configCheckOptions}: Props) => {
  const configEntryGroups = useGroupedChartConfigEntries(configCheckOptions);

  return (
    <>
      {Object.entries(configEntryGroups).map(([groupName, entryObj]) => (
        <React.Fragment key={groupName}>
          <p>{groupName}</p>
          <div className="flex flex-row gap-2">
            {Object.entries(entryObj).map(([key, entry]) => {
              const configKey = key as ChartConfigKeys;

              const {title, isHidden} = entry;
              if (isHidden && isHidden(configCheckOptions)) {
                return <React.Fragment key={groupName}/>;
              }

              const {simplified} = configCheckOptions;
              const value = getChartConfig({config, key: configKey, simplified});

              return (
                <ToggleButton
                  key={key}
                  id={`chart-config-${configKey}`}
                  active={value}
                  title={title}
                  onChange={() => updateConfig(configKey, !value)}
                  className={clsx(
                    'ring-1 ring-inset ring-gray-700',
                    'peer-checked:text-neutral-300 peer-checked:ring-neutral-300',
                    'peer-checked:hover:bg-neutral-300 peer-checked:hover:text-slate-800',
                  )}
                />
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
