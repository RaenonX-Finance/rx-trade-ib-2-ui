import React from 'react';

import {ChartLegendProps} from '@/components/chart/legend/type';
import {formatToDigits} from '@/utils/format/number/regular';


export const ChartLegendForExtrema = ({legend}: ChartLegendProps) => {
  const {extrema, digits} = legend;
  if (!extrema) {
    return null;
  }

  const {min, max} = extrema;

  return (
    <div className="flex flex-row gap-1 p-1">
      <span className="hidden text-3xs text-red-300 md:inline">{formatToDigits({num: min, digits})}</span>
      <span className="hidden text-3xs text-green-300 md:inline">{formatToDigits({num: max, digits})}</span>
    </div>
  );
};
