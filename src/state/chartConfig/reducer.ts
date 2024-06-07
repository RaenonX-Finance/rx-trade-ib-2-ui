import {createSlice} from '@reduxjs/toolkit';

import {chartConfigDispatchers} from '@/state/chartConfig/dispatchers';
import {CHART_CONFIG_STATE_NAME, ChartConfigDispatcherName, ConfigState} from '@/state/chartConfig/type';
import {cloneMerge} from '@/utils/object';


const initialState: ConfigState = {
  layout: {},
  locked: {},
};

const slice = createSlice({
  name: CHART_CONFIG_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      chartConfigDispatchers[ChartConfigDispatcherName.UPDATE_CHART_CONFIG],
      (state, {payload}) => ({
        ...state,
        layout: cloneMerge(
          state.layout,
          {[payload.identifier]: {[payload.configKey]: payload.value}},
        ),
      }),
    );
    builder.addCase(
      chartConfigDispatchers[ChartConfigDispatcherName.UPDATE_LOCKED_REQUEST],
      (state, {payload}) => ({
        ...state,
        locked: {
          ...state.locked,
          [payload.index]: payload.request,
        },
      }),
    );
  },
});

export default slice.reducer;
