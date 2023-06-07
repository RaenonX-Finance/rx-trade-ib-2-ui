import React from 'react';

import {ChartLegendProps} from '@/components/chart/legend/type';


export const ChartLegendForExtrema = ({legend}: ChartLegendProps) => {
  const {extrema, digits} = legend;
  if (!extrema) {
    return <></>;
  }

  const {min, max} = extrema;

  return (
    <div className="flex flex-row gap-1 p-1">
      <span className="hidden text-3xs text-red-300 md:inline">{min.toFixed(digits)}</span>
      <span className="hidden text-3xs text-green-300 md:inline">{max.toFixed(digits)}</span>
    </div>
  );
};
