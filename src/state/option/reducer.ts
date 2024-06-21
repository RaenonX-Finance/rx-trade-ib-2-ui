import {createSlice} from '@reduxjs/toolkit';

import {optionDispatchers} from '@/state/option/dispatchers';
import {OPTION_STATE_NAME, OptionDispatcherName, OptionState} from '@/state/option/types';
import {overwrite, overwriteIncludingArray} from '@/utils/object';
import {sortAsc} from '@/utils/sort/byKey/asc';


const initialState: OptionState = {};

const slice = createSlice({
  name: OPTION_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      optionDispatchers[OptionDispatcherName.UPDATE_DEFINITION],
      (state, {payload}): OptionState => {
        const {origin} = payload;

        if (origin === 'OptionChain') {
          return overwrite(state, {chain: {definition: payload}});
        }

        if (origin === 'GammaExposure') {
          return overwrite(state, {gex: {definition: payload}});
        }

        throw new Error(`Unhandled option definition request origin: ${origin satisfies never}`);
      },
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.UPDATE_CONTRACTS],
      (state, {payload}): OptionState => {
        const {
          origin,
          contractIdPairs,
          realtimeRequestIds,
        } = payload;

        if (origin === 'OptionChain') {
          return overwriteIncludingArray<OptionState>(
            state,
            {
              chain: {
                realtimeRequestsIds: [...state.chain?.realtimeRequestsIds ?? [], ...realtimeRequestIds],
                contracts: [...state.chain?.contracts ?? [], ...contractIdPairs]
                  .toSorted(sortAsc(({strike}) => strike)),
              },
            },
          );
        }

        if (origin === 'GammaExposure') {
          return overwriteIncludingArray<OptionState>(
            state,
            {
              gex: {
                realtimeRequestsIds: [...state.gex?.realtimeRequestsIds ?? [], ...realtimeRequestIds],
                contracts: [...state.gex?.contracts ?? [], ...contractIdPairs],
              },
            },
          );
        }

        throw new Error(`Unhandled option px request origin for contract update: ${origin satisfies never}`);
      },
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.RESET_CONTRACTS],
      (state, {payload}): OptionState => {
        if (payload === 'OptionChain') {
          return overwriteIncludingArray<OptionState>(state, {chain: {contracts: []}});
        }

        if (payload === 'GammaExposure') {
          return overwriteIncludingArray<OptionState>(state, {gex: {contracts: []}});
        }

        throw new Error(`Unhandled option px request origin for contract reset: ${payload satisfies never}`);
      },
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.RESET_REALTIME_REQUESTS],
      (state, {payload}): OptionState => {
        if (payload === 'OptionChain') {
          return overwriteIncludingArray<OptionState>(state, {chain: {realtimeRequestsIds: []}});
        }

        if (payload === 'GammaExposure') {
          return overwriteIncludingArray<OptionState>(state, {gex: {realtimeRequestsIds: []}});
        }

        throw new Error(
          `Unhandled option px request origin for realtime request ID reset: ${payload satisfies never}`,
        );
      },
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.GEX_SET_EXPECTED_EXPIRY],
      (state, {payload}): OptionState => overwriteIncludingArray<OptionState>(
        state,
        {gex: {expectedExpiry: payload.toSorted(sortAsc())}},
      ),
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.CLEAR_OPTION_CHAIN],
      (state): OptionState => ({
        ...state,
        chain: null,
      }),
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.CLEAR_OPTION_GEX],
      (state): OptionState => ({
        ...state,
        gex: null,
      }),
    );
  },
});

export default slice.reducer;
