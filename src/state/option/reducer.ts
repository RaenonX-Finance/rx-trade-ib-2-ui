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
      optionDispatchers[OptionDispatcherName.UPDATE_DEFINITION],
      (state, {payload}) => ({
        ...state,
        definition: payload,
      }),
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.UPDATE_CONTRACT_MAPPING],
      (state, {payload}) => ({
        ...state,
        contractMapping: payload.sort((a, b) => a.strike - b.strike),
      }),
    );
    builder.addCase(
      optionDispatchers[OptionDispatcherName.CLEAR],
      (state) => ({
        ...state,
        definition: undefined,
      }),
    );
  },
});

export default slice.reducer;
