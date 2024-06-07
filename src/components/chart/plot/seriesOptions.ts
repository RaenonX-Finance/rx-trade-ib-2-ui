import {CreatePriceLineOptions, LastPriceAnimationMode, PriceLineOptions} from 'lightweight-charts';

import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {toPositionAvgPxColor} from '@/components/chart/convert/color';
import {toLastBarPx} from '@/components/chart/convert/data';
import {getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {getChartConfig} from '@/state/chartConfig/utils';
import {ChartDataBarWithData} from '@/types/api/chart';
import {PositionData} from '@/types/data/positions';
import {Nullable} from '@/utils/type';


export const getAnimationMode = (enabled: boolean): LastPriceAnimationMode => (
  enabled ?
    LastPriceAnimationMode.OnDataUpdate :
    LastPriceAnimationMode.Disabled
);

type GetPositionAvgPxOptionsOpts = {
  chartConfig: ChartConfigSingle,
  position: Nullable<PositionData>,
  bars: ChartDataBarWithData[],
  simplified: boolean,
};

export const getPositionAvgPxOptions = ({
  chartConfig,
  position,
  bars,
  simplified,
}: GetPositionAvgPxOptionsOpts): CreatePriceLineOptions => {
  return {
    color: position ? toPositionAvgPxColor(position.unrealizedPnl) : undefined,
    price: Math.abs(
      position?.avgPx ??
      toLastBarPx(getTypeOfActiveSeries({chartConfig, simplified}), bars.at(-1)) ??
      NaN,
    ),
    lineVisible: !!position && getChartConfig({config: chartConfig, key: 'lineOfPositionAvgPx', simplified}),
    axisLabelVisible: !!position && !simplified,
  };
};

type GetExtremaVisibilityOptionsOpts = {
  chartConfig: ChartConfigSingle,
  simplified: boolean,
};

export const getExtremaVisibilityOptions = ({
  chartConfig,
  simplified,
}: GetExtremaVisibilityOptionsOpts): Pick<PriceLineOptions, 'lineVisible' | 'axisLabelVisible'> => {
  const visible = !simplified && getChartConfig({config: chartConfig, key: 'lineOfExtrema', simplified});

  return {
    lineVisible: visible,
    axisLabelVisible: visible,
  };
};
