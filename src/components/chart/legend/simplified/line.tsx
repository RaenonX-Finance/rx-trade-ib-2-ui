import React from 'react';

import {format} from 'date-fns/format';
import {LineData} from 'lightweight-charts';

import {ChartLegendOfDataProps} from '@/components/chart/legend/type';
import {updateEpochSecToUtc} from '@/utils/time';


export const ChartSimplifiedLegendOfLine = ({legend, data}: ChartLegendOfDataProps<LineData>) => {
  const {epochSec, digits, hovered} = legend;
  const {value} = data;

  if (!hovered) {
    return <></>;
  }

  // `epochSec` here already has timezone offset,
  // needs to revert it back so `new Date()` is taking the actual UTC epoch
  return (
    <div className="p-1 text-2xs">
      {`${value.toFixed(digits)} / ${format(new Date((updateEpochSecToUtc(epochSec)) * 1000), 'MM-dd HH:mm')}`}
    </div>
  );
};
