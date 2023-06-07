import {createSlice} from '@reduxjs/toolkit';

import {errorDispatchers} from '@/state/error/dispatchers';
import {ERROR_STATE_NAME, ErrorDispatcherName, ErrorState} from '@/state/error/types';


const initialState: ErrorState = {
  message: '',
  timestamp: null,
  show: false,
};

const slice = createSlice({
  name: ERROR_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      errorDispatchers[ErrorDispatcherName.UPDATE],
      (state, {payload}) => ({
        ...state,
        show: true,
        timestamp: Date.now(),
        message: payload.message,
      }),
    );
    builder.addCase(
      errorDispatchers[ErrorDispatcherName.HIDE_ERROR],
      (state) => ({
        ...state,
        show: false,
        timestamp: null,
      }),
    );
  },
});

export default slice.reducer;
