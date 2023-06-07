import {createSlice} from '@reduxjs/toolkit';

import {accountDispatchers} from '@/state/account/dispatchers';
import {ACCOUNT_STATE_NAME, AccountDispatcherName, AccountState} from '@/state/account/types';


const initialState: AccountState = {
  info: {},
  currentAccountIndex: 0,
  list: [],
};

const slice = createSlice({
  name: ACCOUNT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      accountDispatchers[AccountDispatcherName.DATA_UPDATE],
      (state, {payload}) => ({
        ...state,
        info: {
          ...state.info,
          [payload.account]: {
            ...(state.info[payload.account] ?? {}),
            data: {
              ...(state.info[payload.account]?.data ?? {}),
              [payload.key]: payload.value,
            },
            lastUpdatedEpochMs: Date.now(),
          },
        },
      }),
    );
    builder.addCase(
      accountDispatchers[AccountDispatcherName.PNL_UPDATE],
      (state, {payload}) => ({
        ...state,
        info: {
          ...state.info,
          [payload.account]: {
            ...(state.info[payload.account] ?? {
              data: {},
            }),
            pnl: {
              daily: payload.dailyPnl,
              realized: payload.realizedPnl,
              unrealized: payload.unrealizedPnl,
            },
            lastUpdatedEpochMs: Date.now(),
          },
        },
      }),
    );
    builder.addCase(
      accountDispatchers[AccountDispatcherName.SET_LIST],
      (state, {payload}) => ({
        ...state,
        list: payload.accounts,
      }),
    );
    builder.addCase(
      accountDispatchers[AccountDispatcherName.SET_ACCOUNT],
      (state, {payload}) => ({
        ...state,
        currentAccountIndex: payload,
      }),
    );
  },
});

export default slice.reducer;
