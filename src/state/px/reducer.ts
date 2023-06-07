import {createSlice} from '@reduxjs/toolkit';

import {pxDispatchers} from '@/state/px/dispatchers';
import {PX_STATE_NAME, PxDispatcherName, PxState} from '@/state/px/types';


const initialState: PxState = {};

const slice = createSlice({
  name: PX_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      pxDispatchers[PxDispatcherName.PX_UPDATE],
      (state, {payload}) => {
        const {contractId, update} = payload;
        const pxOfContract = state[contractId] ?? {};

        return {
          ...state,
          [contractId]: {
            ...pxOfContract,
            ...update,
          },
        };
      },
    );
  },
});

export default slice.reducer;
