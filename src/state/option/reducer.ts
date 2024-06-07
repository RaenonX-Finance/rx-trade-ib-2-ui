import {createSlice} from '@reduxjs/toolkit';

import {optionDispatchers} from '@/state/option/dispatchers';
import {OPTION_STATE_NAME, OptionDispatcherName, OptionState} from '@/state/option/types';
import {overwrite} from '@/utils/object';
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
          return overwrite(state, {chain: {contracts: contractIdPairs.toSorted(sortAsc(({strike}) => strike))}});
        }

        if (origin === 'GammaExposure') {
          return overwrite(state, {gex: {contracts: contractIdPairs}});
        }

        throw new Error(`Unhandled option px request origin: ${origin satisfies never}`);
      },
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.CHAIN_CLEAR],
      (state): OptionState => ({
        ...state,
        chain: null,
      }),
    );
  },
});

export default slice.reducer;
