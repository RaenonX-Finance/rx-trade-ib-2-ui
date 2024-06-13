import {CaseReducer, createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/src/createAction';

import {chartDispatchers} from '@/state/chartPx/dispatchers';
import {chartStateUpdater, ChartStateUpdaterOpts} from '@/state/chartPx/reducer/stateUpdater';
import {chartStateUpdaterOnInit} from '@/state/chartPx/reducer/stateUpdaterOnInit';
import {chartStateUpdaterOnUpdate} from '@/state/chartPx/reducer/stateUpdaterOnUpdate';
import {updateChartDataBar} from '@/state/chartPx/reducer/utils';
import {CHART_STATE_NAME, ChartDataState, ChartDispatcherName} from '@/state/chartPx/types';
import {PxHistoryMessage} from '@/types/api/px';
import {historyMetaToIdentifier} from '@/utils/pxData';


const initialState: ChartDataState = {
  data: {},
};

const historyUpdateReducer = <T extends PxHistoryMessage>(
  fnUpdateState: ChartStateUpdaterOpts<T>['fnUpdateState'],
): CaseReducer<ChartDataState, PayloadAction<T>> => (
  state, {payload},
) => chartStateUpdater({
  state,
  payload: [{identifier: historyMetaToIdentifier(payload.meta), data: payload}],
  fnUpdateState,
});

const slice = createSlice({
  name: CHART_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      chartDispatchers[ChartDispatcherName.HISTORY_INIT],
      historyUpdateReducer(chartStateUpdaterOnInit),
    );
    builder.addCase(
      chartDispatchers[ChartDispatcherName.HISTORY_UPDATE],
      historyUpdateReducer(chartStateUpdaterOnUpdate),
    );
    builder.addCase(chartDispatchers[ChartDispatcherName.UPDATE_MARKET].fulfilled, (state, {payload}) => {
      for (const {identifier, newPx} of payload) {
        const data = state.data[identifier];
        const lastBar = data?.bars.at(-1);

        if (!data || !lastBar) {
          continue;
        }

        data.bars = data.bars.slice(0, -1).concat([updateChartDataBar(lastBar, newPx)]);
      }
    });
  },
});

export default slice.reducer;
