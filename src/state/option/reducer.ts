import {createSlice} from '@reduxjs/toolkit';

import {optionDispatchers} from '@/state/option/dispatchers';
import {OPTION_STATE_NAME, OptionDispatcherName, OptionState} from '@/state/option/types';


const initialState: OptionState = {};

const slice = createSlice({
  name: OPTION_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      optionDispatchers[OptionDispatcherName.CHAIN_UPDATE_DEFINITION],
      (state, {payload}): OptionState => ({
        ...state,
        chain: {
          ...state.chain,
          definition: payload,
        },
      }),
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.CHAIN_UPDATE_CONTRACTS],
      (state, {payload}): OptionState => ({
        ...state,
        chain: {
          ...state.chain,
          contracts: payload.toSorted((a, b) => a.strike - b.strike),
        },
      }),
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
