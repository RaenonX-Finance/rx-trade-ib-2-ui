import {BarsInfo, DeepPartial, PriceFormat, SeriesType} from 'lightweight-charts';

import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {ExtremaPx, GetCurrentExtremaPxOptions} from '@/components/chart/plot/type';
import {getChartConfig} from '@/state/chartConfig/utils';
import {ChartDataBar} from '@/types/api/chart';
import {ContractInState} from '@/types/data/contract';


export const getCurrentChartExtremaPx = ({chart, series, bars}: GetCurrentExtremaPxOptions): ExtremaPx => {
  const visibleRange = chart.timeScale().getVisibleLogicalRange();

  if (!visibleRange) {
    throw new Error('No data in chart');
  }

  const barsInfo = series.barsInLogicalRange(visibleRange);

  if (!barsInfo) {
    throw new Error(
      'No available series data found in the requested range, ' +
      'check https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi#barsinlogicalrange',
    );
  }

  return getExtremaPxOfRange(barsInfo, bars);
};

export const getExtremaPxOfRange = (barsInfo: BarsInfo, data: ChartDataBar[]): ExtremaPx => {
  const {from, to} = barsInfo;

  if (!from || !to) {
    console.warn('Bars info does not include timestamps', barsInfo);
    return {minPx: null, maxPx: null};
  }

  const bars = data.filter(({epochSec}) => epochSec >= (from as number) && epochSec <= (to as number));

  const maxPx = Math.max(...bars.map(({high}) => high));
  const minPx = Math.min(...bars.map(({low}) => low));

  return {minPx, maxPx};
};

export const getPriceFormat = (contract: ContractInState): DeepPartial<PriceFormat> => ({
  minMove: contract.details?.minTick ?? 0.01,
});

type GetKeyOfActiveSeriesOpts = {
  chartConfig: ChartConfigSingle,
  simplified: boolean,
};

export const getTypeOfActiveSeries = ({chartConfig, simplified} : GetKeyOfActiveSeriesOpts): SeriesType => {
  const showAsLine = getChartConfig({config: chartConfig, key: 'showAsLine', simplified});

  if (showAsLine) {
    return 'Line';
  }

  return 'Candlestick';
};

