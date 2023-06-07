import React from 'react';

import {ChevronRightIcon, Cog6ToothIcon} from '@heroicons/react/24/outline';

import {ChartToolbarProps} from '@/components/chart/toolbar/type';

import styles from './main.module.css';


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
      <button title="Settings" className={styles['toolbar-button']} onClick={() => setShow(true)}>
        <Cog6ToothIcon className="h-3 w-3 text-gray-200"/>
      </button>
      <button title="To Realtime" className={styles['toolbar-button']} onClick={() => {
        chartRef.current?.timeScale().scrollToRealTime();
      }}>
        <ChevronRightIcon className="h-3 w-3 text-gray-200"/>
      </button>
    </>
  );
};
