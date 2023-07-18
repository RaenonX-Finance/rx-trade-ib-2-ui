import {extremaCommonOptions} from '@/components/chart/const';
import {getExtremaVisibilityOptions} from '@/components/chart/plot/seriesOptions';
import {getCurrentChartExtremaPx} from '@/components/chart/plot/utils';
import {ChartChangedCommonPayload, ChartExtremaSeries, ChartSeries} from '@/components/chart/type';


export const makeExtrema = (e: ChartChangedCommonPayload, series: ChartSeries): ChartExtremaSeries => {
  const {
    chartRef,
    chartDataRef,
    chartConfig,
    setAddon,
    simplified,
  } = e;

  if (!chartRef.current) {
    throw new Error('Attempt to initialize extrema lines but the chart is not ready');
  }

  const {minPx, maxPx} = getCurrentChartExtremaPx({
    chart: chartRef.current,
    bars: chartDataRef.current.bars,
    series,
  });
  if (!minPx) {
    throw new Error(`Failed to initialize extrema Px lines (min: ${minPx} / max: ${maxPx})`);
  }

  setAddon.legend((legend) => ({
    ...legend,
    extrema: {
      min: minPx,
      max: maxPx,
    },
  }));

  return {
    max: series.createPriceLine({
      title: 'H',
      price: maxPx,
      ...getExtremaVisibilityOptions({chartConfig, simplified}),
      ...extremaCommonOptions,
    }),
    min: series.createPriceLine({
      title: 'L',
      price: minPx,
      ...getExtremaVisibilityOptions({chartConfig, simplified}),
      ...extremaCommonOptions,
    }),
  };
};
