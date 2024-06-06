import {makeExtrema} from '@/components/chart/plot/onChanged/setup/extrema';
import {makePositionAvgPx} from '@/components/chart/plot/onChanged/setup/positionAvgPx';
import {makePxSeries} from '@/components/chart/plot/onChanged/setup/pxSeries';
import {ChartChangedCommonPayload, ChartInitData} from '@/components/chart/type';


export const makeInitData = (e: ChartChangedCommonPayload): ChartInitData => {
  const series = makePxSeries(e);
  const extrema = makeExtrema(e, series);
  const positionAvgPx = makePositionAvgPx(e, series);

  return {
    series,
    lines: {
      extrema,
      positionAvgPx,
    },
  };
};
