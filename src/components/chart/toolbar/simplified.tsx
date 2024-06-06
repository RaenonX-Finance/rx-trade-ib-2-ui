import React from 'react';

import {ChevronRightIcon, Cog6ToothIcon, MagnifyingGlassMinusIcon} from '@heroicons/react/24/outline';

import {chartShowFromOpen} from '@/components/chart/positioning';
import {ChartToolbarProps} from '@/components/chart/toolbar/type';
import {ChartData} from '@/types/data/chart';


export const ChartToolbarSimplified = <T extends ChartData, A>({
  chartConfig,
  chartRef,
  chartDataRef,
  renderChartConfig,
  setChartConfig,
  contract,
}: ChartToolbarProps<T, A>) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex flex-row">
      {chartConfig && renderChartConfig({contract, chartConfig, setChartConfig, show, setShow})}
      <button title="Settings" className="button-chart-toolbar" onClick={() => setShow(true)}>
        <Cog6ToothIcon className="size-3 text-gray-200"/>
      </button>
      <button title="To Current Range" disabled={!contract} className="button-chart-toolbar" onClick={() => {
        if (!contract) {
          return;
        }

        chartShowFromOpen({
          chartRef,
          chartDataRef,
          contract,
        });
      }}>
        <MagnifyingGlassMinusIcon className="size-3 text-gray-200"/>
      </button>
      <button title="To Realtime" className="button-chart-toolbar" onClick={() => {
        chartRef.current?.timeScale().scrollToRealTime();
      }}>
        <ChevronRightIcon className="size-3 text-gray-200"/>
      </button>
    </div>
  );
};
