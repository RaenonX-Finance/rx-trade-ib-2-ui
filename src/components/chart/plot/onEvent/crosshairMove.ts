import {MouseEventHandler, Time} from 'lightweight-charts';

import {toLegendDataFromBar} from '@/components/chart/convert/legend';
import {getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {ChartInitPayload} from '@/components/chart/type';


export const handleCrosshairMove = (e: ChartInitPayload): MouseEventHandler<Time> => ({time}) => {
  const {chartDataRef, setAddon} = e;

  const data = chartDataRef.current.bars;

  const hovered = data.find(({epochSec}) => epochSec === time);
  const last = data.at(-1);
  const seriesType = getTypeOfActiveSeries(e);

  setAddon.legend((original) => {
    const {digits} = original;

    if (hovered) {
      return toLegendDataFromBar({original, bar: hovered, digits, seriesType, hovered: true});
    }

    if (last) {
      return toLegendDataFromBar({original, bar: last, digits, seriesType, hovered: false});
    }

    return toLegendDataFromBar({original, bar: undefined, digits, seriesType, hovered: false});
  });
};
