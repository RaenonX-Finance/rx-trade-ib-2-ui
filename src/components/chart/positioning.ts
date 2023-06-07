import React from 'react';

import {IChartApi, ITimeScaleApi, UTCTimestamp} from 'lightweight-charts';

import {ChartData} from '@/types/data/chart';
import {ContractInState} from '@/types/data/contract';
import {isSecurityTypeOptions} from '@/utils/api';
import {updateEpochSecToLocal} from '@/utils/time';


type ChartShowFromOpenOpts<T extends ChartData> = {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartDataRef: React.MutableRefObject<T>,
  contract: ContractInState,
};

const timeToLogical = (scale: ITimeScaleApi, timestamp: UTCTimestamp): number | null => {
  const coordinate = scale.timeToCoordinate(timestamp);

  if (!coordinate) {
    return null;
  }

  return scale.coordinateToLogical(coordinate);
};

export const chartShowFromOpen = <T extends ChartData>({
  chartRef,
  chartDataRef,
  contract,
}: ChartShowFromOpenOpts<T>) => {
  const now = new Date();
  const date = new Date(now.toDateString());

  if (now.toTimeString() < '08:30') {
    // If it's before market open, start from the open of the previous day (except weekend)
    let day = date.getDay();
    do {
      date.setDate(date.getDate() - 1);
      day = date.getDay();
    } while (day < 1 || day > 5);
  }

  const epochSecStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    8,
    isSecurityTypeOptions(contract.securityType) ? 30 : 0,
  ).getTime();
  const scale = chartRef.current?.timeScale();
  if (!scale) {
    return;
  }

  const lastBar = chartDataRef.current?.bars.at(-1);
  if (!lastBar) {
    return;
  }

  const from = timeToLogical(scale, updateEpochSecToLocal(epochSecStart / 1000) as UTCTimestamp);
  // Can't use `now` as `timeToLogical()` needs to match the timestamp of the bars
  const to = timeToLogical(scale, lastBar.epochSec as UTCTimestamp);

  if (!from || !to) {
    return;
  }

  // +30 for some right margin
  scale.setVisibleLogicalRange({from, to: to + 30});
};
