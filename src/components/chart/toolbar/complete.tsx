import React from 'react';

import {ChevronRightIcon, Cog6ToothIcon} from '@heroicons/react/24/outline';

import {ChartToolbarProps} from '@/components/chart/toolbar/type';


export const ChartToolbarComplete = <T, A>({
  chartConfig,
  chartRef,
  renderChartConfig,
  setChartConfig,
  contract,
}: ChartToolbarProps<T, A>) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      {chartConfig && renderChartConfig({contract, chartConfig, setChartConfig, show, setShow})}
      <button title="Settings" className="button-chart-toolbar" onClick={() => setShow(true)}>
        <Cog6ToothIcon className="size-3 text-gray-200"/>
      </button>
      <button title="To Realtime" className="button-chart-toolbar" onClick={() => {
        chartRef.current?.timeScale().scrollToRealTime();
      }}>
        <ChevronRightIcon className="size-3 text-gray-200"/>
      </button>
    </>
  );
};
