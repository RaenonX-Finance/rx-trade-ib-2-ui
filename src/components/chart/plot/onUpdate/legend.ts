import {toLegendDataFromBar} from '@/components/chart/convert/legend';
import {getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {ChartUpdatedPayload} from '@/components/chart/type';


export const handleLegend = (e: ChartUpdatedPayload) => {
  const {chartDataRef, setAddon} = e;
  const seriesType = getTypeOfActiveSeries(e);

  setAddon.legend((original) => {
    const {digits, hovered} = original;

    // Only update the legend on Px changed if not hovered,
    // So even if the latest bar is updated, the legend won't change
    if (hovered) {
      return original;
    }

    return toLegendDataFromBar({
      original,
      bar: chartDataRef.current.bars.at(-1),
      seriesType,
      digits,
      hovered,
    });
  });
};
