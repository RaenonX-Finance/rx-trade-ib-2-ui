import {toSeriesData} from '@/components/chart/convert/data';
import {makeInitData} from '@/components/chart/plot/onChanged/make';
import {updateSeriesData} from '@/components/chart/plot/onUpdate/pxSeries/update';
import {getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {ChartUpdatedPayload} from '@/components/chart/type';
import {getChartConfig} from '@/state/chartConfig/utils';


export const handlePxSeries = (e: ChartUpdatedPayload) => {
  const {
    chartDataRef,
    chartApiRef,
    chartConfig,
    setAddon,
    partial,
    simplified,
  } = e;

  if (!chartApiRef.current) {
    return;
  }

  const last = chartDataRef.current.bars.at(-1);
  if (!last) {
    return;
  }

  const series = chartApiRef.current.initData.series;

  if (getTypeOfActiveSeries(e) !== series.seriesType()) {
    // Switch series if type changed
    chartApiRef.current.initData = makeInitData(e);
  } else {
    // Update price line visibility if series type to show is not changed
    series.applyOptions({
      priceLineVisible: getChartConfig({config: chartConfig, key: 'lineOfCurrentPx', simplified}),
    });
  }

  const lastBarOnChart = updateSeriesData({
    series,
    partial,
    last,
    bars: chartDataRef.current.bars,
    convertToBar: toSeriesData(series.seriesType()),
  });
  if (!lastBarOnChart) {
    return;
  }

  setAddon.legend((legend) => ({...legend, lastBarOnChart}));
};
