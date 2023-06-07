import {BarConverter} from '@/components/chart/convert/type';
import {ChartBarInUse, ChartSeries} from '@/components/chart/type';
import {ChartDataBar} from '@/types/api/chart';


type UpdateSeriesDataOpts = {
  series: ChartSeries,
  partial: boolean,
  last: ChartDataBar,
  bars: ChartDataBar[],
  convertToBar: BarConverter,
};

export const updateSeriesData = ({
  series,
  partial,
  last,
  bars,
  convertToBar,
}: UpdateSeriesDataOpts): ChartBarInUse | undefined => {
  if (!partial) {
    const converted = bars.map(convertToBar);

    series.setData(converted);
    return converted.at(-1);
  }

  try {
    const converted = convertToBar(last);

    series.update(converted);
    return converted;
  } catch (e) {
    if (e instanceof Error && e.message.startsWith('Cannot update oldest data')) {
      const converted = bars.map(convertToBar);

      series.setData(converted);
      return converted.at(-1);
    }

    throw e;
  }
};
