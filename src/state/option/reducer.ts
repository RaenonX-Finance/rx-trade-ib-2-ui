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
        const {origin, contractIdPairs} = payload;

        if (origin === 'OptionChain') {
          return overwriteIncludingArray(
            state,
            {chain: {contracts: contractIdPairs.toSorted(sortAsc(({strike}) => strike))}},
          );
        }

        if (origin === 'GammaExposure') {
          const contracts = state.gex?.contracts ?? [];

          return overwriteIncludingArray(state, {gex: {contracts: [...contracts, ...contractIdPairs]}});
        }

        throw new Error(`Unhandled option px request origin: ${origin satisfies never}`);
      },
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
