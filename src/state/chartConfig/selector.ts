import {useSelector} from 'react-redux';

import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {defaultChartRequest, getDefaultConfig} from '@/state/chartConfig/const';
import {ReduxState} from '@/state/types';
import {ChartDataIdentifier} from '@/types/data/chart';
import {ChartDataRequest} from '@/ui/px/type';


export const useSingleChartConfigSelector = (
  identifier: ChartDataIdentifier,
  simplified: boolean,
): ChartConfigSingle => (
  useSelector(({chartConfig}: ReduxState) => chartConfig.layout[identifier] ?? getDefaultConfig(simplified))
);

export const useChartLockedRequestSelector = (index: number): ChartDataRequest => (
  useSelector(({chartConfig}: ReduxState) => chartConfig.locked[index] ?? defaultChartRequest)
);

export const useIsSymbolLockedSelected = (symbol: string | undefined): boolean => (
  useSelector(({chartConfig}: ReduxState) => (
    symbol ?
      false :
      Object.values(chartConfig.locked).some((request) => symbol === request?.symbol)
  ))
);
