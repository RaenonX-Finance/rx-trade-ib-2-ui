import {SeriesDataItemTypeMap, SeriesType, UTCTimestamp} from 'lightweight-charts';

import {toSessionColor} from '@/components/chart/convert/color';
import {BarConverter, GetPxFromBar} from '@/components/chart/convert/type';
import {isBarInUseCandlestick, isBarInUseLine, isBarInUseWhitespace} from '@/components/chart/legend/utils';
import {ChartDataBarWithData} from '@/types/api/chart';
import {updateEpochSecToUtc} from '@/utils/time';


export const toCandlestick = ({
  epochSec,
  open,
  high,
  low,
  close,
}: ChartDataBarWithData): SeriesDataItemTypeMap['Candlestick'] => ({
  time: epochSec as UTCTimestamp,
  open,
  high,
  low,
  close,
});

export const toLineData = (
  getValue: GetPxFromBar,
) => (
  bar: ChartDataBarWithData,
): SeriesDataItemTypeMap['Line'] => {
  const value = getValue(bar);
  const {epochSec} = bar;
  const color = toSessionColor(new Date(updateEpochSecToUtc(epochSec) * 1000));

  if (!value) {
    return {
      time: bar.epochSec as UTCTimestamp,
      color,
    };
  }

  return {
    time: bar.epochSec as UTCTimestamp,
    color,
    value,
  };
};

export const toSeriesData = (seriesType: SeriesType): BarConverter => {
  if (seriesType === 'Line') {
    return toLineData(({close}) => close);
  }

  if (seriesType === 'Candlestick') {
    return toCandlestick;
  }

  throw new Error(`BarOnChart: Unhandled series data conversion of type: ${seriesType}`);
};

export const toLastBarPx = (seriesType: SeriesType, bar: ChartDataBarWithData | undefined): number | null => {
  if (!bar) {
    return null;
  }

  const lastBar = toSeriesData(seriesType)(bar);

  if (isBarInUseLine(lastBar)) {
    return lastBar.value;
  }

  if (isBarInUseCandlestick(lastBar)) {
    return lastBar.close;
  }

  if (isBarInUseWhitespace(lastBar)) {
    return null;
  }

  throw new Error(
    `BarOnChart: Unhandled series type to get the last bar px: ${seriesType} / ${JSON.stringify(bar)}`,
  );
};
