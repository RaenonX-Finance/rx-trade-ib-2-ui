import React from 'react';

import {LineData} from 'lightweight-charts';

import {LegendDataCell} from '@/components/chart/legend/cell';
import {ChartLegendOfDataProps} from '@/components/chart/legend/type';


export const ChartCompleteLegendOfLine = ({data}: ChartLegendOfDataProps<LineData>) => {
  const {value} = data;

  return (
    <>
      WIP Legend for line data
      <LegendDataCell title="C" value={value} large/>
    </>
  );
};
