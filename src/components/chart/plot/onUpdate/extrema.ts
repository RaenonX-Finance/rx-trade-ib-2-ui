import {getExtremaVisibilityOptions} from '@/components/chart/plot/seriesOptions';
import {getCurrentChartExtremaPx} from '@/components/chart/plot/utils';
import {ChartUpdatedPayload} from '@/components/chart/type';


export const handleExtrema = (e: ChartUpdatedPayload) => {
  const {
    chartRef,
    chartApiRef,
    chartDataRef,
    chartConfig,
    setAddon,
    simplified,
  } = e;
  if (!chartRef.current || !chartApiRef.current) {
    return;
  }

  const {minPx, maxPx} = getCurrentChartExtremaPx({
    chart: chartRef.current,
    bars: chartDataRef.current.bars,
    series: chartApiRef.current.initData.series,
  });
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
  min.applyOptions({
    price: minPx,
    ...getExtremaVisibilityOptions({chartConfig, simplified}),
  });
  max.applyOptions({
    price: maxPx,
    ...getExtremaVisibilityOptions({chartConfig, simplified}),
  });
};
