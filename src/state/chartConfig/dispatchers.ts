import {createAction} from '@reduxjs/toolkit';

import {
  ChartConfigDispatcherName,
  ChartConfigUpdatePayload,
  ChartLockedRequestUpdatePayload,
} from '@/state/chartConfig/type';


export const chartConfigDispatchers = {
  [ChartConfigDispatcherName.UPDATE_CHART_CONFIG]: createAction<ChartConfigUpdatePayload>(
    ChartConfigDispatcherName.UPDATE_CHART_CONFIG,
  ),
  [ChartConfigDispatcherName.UPDATE_LOCKED_REQUEST]: createAction<ChartLockedRequestUpdatePayload>(
    ChartConfigDispatcherName.UPDATE_LOCKED_REQUEST,
  ),
};
