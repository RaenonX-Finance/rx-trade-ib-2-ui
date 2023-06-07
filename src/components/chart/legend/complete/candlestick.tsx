import React from 'react';

import {CandlestickData} from 'lightweight-charts';

import {LegendDataCell} from '@/components/chart/legend/cell';
import {ChartLegendOfDataProps, PxDirectionText} from '@/components/chart/legend/type';
import {formatNumber} from '@/utils/string';


export const ChartCompleteLegendOfCandlestick = ({legend, data}: ChartLegendOfDataProps<CandlestickData>) => {
  const {digits} = legend;
  const {open, high, low, close} = data;

  const diffVal = close - open;
  const diffPct = diffVal / open * 100;

  let direction: PxDirectionText = 'neutral';
  if (diffVal) {
    if (diffVal > 0) {
      direction = 'up';
    } else if (diffVal < 0) {
      direction = 'down';
    }
  }

  return (
    <>
      <LegendDataCell title="O" value={open} digits={2} className="hidden sm:inline"/>
      <LegendDataCell title="H" value={high} digits={2} className="hidden md:inline"/>
      <LegendDataCell title="L" value={low} digits={2} className="hidden md:inline"/>
      <LegendDataCell title="C" value={close} large/>
      <LegendDataCell
        value={
          diffVal === 0 ?
            '-' :
            `${formatNumber({num: diffVal, digits})} (${formatNumber({num: diffPct, digits: 2})}%)`
        }
        direction={direction}
      />
    </>
  );
};
