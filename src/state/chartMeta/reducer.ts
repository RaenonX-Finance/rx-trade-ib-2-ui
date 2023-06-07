import {CaseReducer, createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/src/createAction';

import {CHART_META_STATE_NAME, ChartMetaState} from '@/state/chartMeta/types';
import {chartDispatchers} from '@/state/chartPx/dispatchers';
import {ChartDispatcherName} from '@/state/chartPx/types';
import {PxHistoryMessage} from '@/types/api/px';
import {ContractId} from '@/types/data/px';


const initialState: ChartMetaState = {
  lastPxUpdate: {},
  completePxUpdate: {},
};

type PxUpdateRecordOpts = {
  state: ChartMetaState,
  contractIds: ContractId[],
  last: boolean,
  complete: boolean,
};

const recordPxUpdateReducer = ({state, contractIds, last, complete}: PxUpdateRecordOpts): ChartMetaState => {
  const now = Date.now();
  const data = Object.fromEntries(contractIds.map((contractId) => [contractId, now]));

  return {
    ...state,
    ...(last ? {lastPxUpdate: {...state.lastPxUpdate, ...data}} : {}),
    ...(complete ? {completePxUpdate: {...state.completePxUpdate, ...data}} : {}),
  };
};

const historyUpdateReducer = (
  isCompleteUpdate: boolean,
): CaseReducer<ChartMetaState, PayloadAction<PxHistoryMessage>> => (
  state, {payload},
) => recordPxUpdateReducer({
  state,
  contractIds: [payload.meta.contractId],
  last: true,
  complete: isCompleteUpdate,
});

const slice = createSlice({
  name: CHART_META_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(chartDispatchers[ChartDispatcherName.HISTORY_INIT], historyUpdateReducer(true));
    builder.addCase(chartDispatchers[ChartDispatcherName.HISTORY_UPDATE], historyUpdateReducer(false));
    builder.addCase(
      chartDispatchers[ChartDispatcherName.UPDATE_MARKET].fulfilled,
      (state, {meta}) => (
        recordPxUpdateReducer({
          state,
          contractIds: [meta.arg.contractId],
          last: true,
          complete: false,
        })
      ),
    );
  },
});

export default slice.reducer;
