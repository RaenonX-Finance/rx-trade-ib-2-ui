import React from 'react';

import {format} from 'date-fns/format';
import {WhitespaceData} from 'lightweight-charts';

import {ChartLegendOfDataProps} from '@/components/chart/legend/type';
import {updateEpochSecToUtc} from '@/utils/time';


export const ChartSimplifiedLegendOfWhitespace = ({legend}: ChartLegendOfDataProps<WhitespaceData>) => {
  const {epochSec, hovered} = legend;

  if (!hovered) {
    return <></>;
  }

  return (
    <div className="p-1 text-2xs">
      {`- / ${format(new Date((updateEpochSecToUtc(epochSec)) * 1000), 'MM-dd HH:mm')}`}
    </div>
  );
};
