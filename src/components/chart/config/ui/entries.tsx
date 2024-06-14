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
                  active={value}
                  text={title}
                  onClick={() => updateConfig(configKey, !value)}
                  getClassName={(active) => clsx(
                    active ?
                      'text-neutral-300 ring-neutral-300 hover:bg-neutral-300 hover:text-slate-800' :
                      'text-neutral-300 ring-gray-700 hover:bg-gray-700',
                  )}
                  className="ring-1 ring-inset"
                />
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
