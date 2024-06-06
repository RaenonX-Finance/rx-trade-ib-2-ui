import React from 'react';

import {format} from 'date-fns/format';
import {CandlestickData} from 'lightweight-charts';

import {ChartLegendOfDataProps} from '@/components/chart/legend/type';
import {updateEpochSecToUtc} from '@/utils/time';


export const ChartSimplifiedLegendOfCandlestick = ({legend, data}: ChartLegendOfDataProps<CandlestickData>) => {
  const {epochSec, digits, hovered} = legend;
  const {close} = data;

  if (!hovered) {
    return null;
  }

  // `epochSec` here already has timezone offset,
  // needs to revert it back so `new Date()` is taking the actual UTC epoch
  return (
    <div className="p-1 text-2xs">
      {`${close.toFixed(digits)} / ${format(new Date((updateEpochSecToUtc(epochSec)) * 1000), 'MM-dd HH:mm')}`}
    </div>
  );
};
