import {createSlice} from '@reduxjs/toolkit';

import {contractDispatchers} from '@/state/contract/dispatchers';
import {CONTRACT_STATE_NAME, ContractDispatcherName, ContractState} from '@/state/contract/types';
import {insertContract, mergeContract} from '@/state/contract/utils';
import {orderDispatchers} from '@/state/order/dispatchers';
import {OrderDispatcherName} from '@/state/order/types';
import {positionDispatchers} from '@/state/position/dispatchers';
import {PositionDispatcherName} from '@/state/position/types';


const initialState: ContractState = {};

const slice = createSlice({
  name: CONTRACT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      positionDispatchers[PositionDispatcherName.POSITION_UPDATE].fulfilled,
      (state, {payload}) => insertContract(state, payload.contract),
    );
    builder.addCase(
      orderDispatchers[OrderDispatcherName.RECORD_COMPLETED].fulfilled,
      (state, {payload}) => insertContract(state, payload.contract),
    );
    builder.addCase(
      contractDispatchers[ContractDispatcherName.RECORD_MODELS],
      (state, {payload}) => {
        payload.forEach((contract) => {
          state = mergeContract(state, contract);
        });

        return state;
      },
    );
    builder.addCase(
      contractDispatchers[ContractDispatcherName.UPDATE_MARGIN],
      (state, {payload}) => {
        const contract = state[payload.contractId];

        if (!contract) {
          // Drop the margin update message if the contract is not initialized
          return state;
        }

        const {initialMargin, maintenanceMargin} = payload;

        return {
          ...state,
          [payload.contractId]: {
            ...contract,
            initialMargin,
            maintenanceMargin,
          },
        };
      },
    );
  },
});

export default slice.reducer;
