import React from 'react';

import {Dialog} from '@headlessui/react';

import {ChartConfigCheckOptions} from '@/components/chart/config/type';
import {ChartConfigEntries} from '@/components/chart/config/ui/entries';
import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {Popup} from '@/components/popup';
import {ChartConfigUpdatePayload} from '@/state/chartConfig/type';
import {ChartDataIdentifier} from '@/types/data/chart';
import {ContractInState} from '@/types/data/contract';


export type ChartConfigPanelProps = {
  contract: ContractInState,
  identifier: ChartDataIdentifier,
  config: ChartConfigSingle,
  setConfig: (payload: ChartConfigUpdatePayload) => void,
  show: boolean,
  setShow: (show: boolean) => void,
  configCheckOptions: ChartConfigCheckOptions,
};

export const ChartConfigPanel = ({
  contract,
  identifier,
  config,
  setConfig,
  show,
  setShow,
  configCheckOptions,
}: ChartConfigPanelProps) => {
  return (
    <Popup show={show} setShow={setShow} className="flex flex-col gap-2 text-start">
      <Dialog.Title className="flex flex-row items-end gap-1 text-xl text-cyan-300">
        <div>{contract.localSymbol}</div>
        <small className="text-sm text-slate-400">{identifier}</small>
      </Dialog.Title>
      <hr className="border-gray-600"/>
      <ChartConfigEntries
        config={config}
        updateConfig={(configKey, value) => {
          setConfig({
            identifier,
            configKey,
            value,
          });
        }}
        configCheckOptions={configCheckOptions}
      />
    </Popup>
  );
};
