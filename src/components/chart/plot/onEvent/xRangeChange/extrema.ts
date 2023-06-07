import {HandleXrangeChangeOpts} from '@/components/chart/plot/onEvent/xRangeChange/type';
import {getExtremaPxOfRange} from '@/components/chart/plot/utils';


export const handleXrangeChangeExtrema = ({e, barsInfo}: HandleXrangeChangeOpts) => {
  const {chartApiRef, chartDataRef, setAddon} = e;

  if (!barsInfo || !chartApiRef.current) {
    return;
  }

  const {minPx, maxPx} = getExtremaPxOfRange(barsInfo, chartDataRef.current.bars);
  if (!minPx) {
    return;
  }

  setAddon.legend((legend) => ({
    ...legend,
    extrema: {
      min: minPx,
      max: maxPx,
    },
  }));

  const {min, max} = chartApiRef.current.initData.lines.extrema;
  min.applyOptions({price: minPx});
  max.applyOptions({price: maxPx});
};
