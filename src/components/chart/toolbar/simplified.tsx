import React from 'react';

import {ChevronRightIcon, Cog6ToothIcon, MagnifyingGlassMinusIcon} from '@heroicons/react/24/outline';

import {chartShowFromOpen} from '@/components/chart/positioning';
import {ChartToolbarProps} from '@/components/chart/toolbar/type';
import {ChartData} from '@/types/data/chart';

import styles from './main.module.css';


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
      <button title="Settings" className={styles['toolbar-button']} onClick={() => setShow(true)}>
        <Cog6ToothIcon className="h-3 w-3 text-gray-200"/>
      </button>
      <button title="To Current Range" disabled={!contract} className={styles['toolbar-button']} onClick={() => {
        if (!contract) {
          return;
        }

        chartShowFromOpen({
          chartRef,
          chartDataRef,
          contract,
        });
      }}>
        <MagnifyingGlassMinusIcon className="h-3 w-3 text-gray-200"/>
      </button>
      <button title="To Realtime" className={styles['toolbar-button']} onClick={() => {
        chartRef.current?.timeScale().scrollToRealTime();
      }}>
        <ChevronRightIcon className="h-3 w-3 text-gray-200"/>
      </button>
    </div>
  );
};
