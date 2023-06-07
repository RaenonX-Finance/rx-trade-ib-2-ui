import {createSlice} from '@reduxjs/toolkit';

import {positionDispatchers} from '@/state/position/dispatchers';
import {POSITION_STATE_NAME, PositionDispatcherName, PositionState} from '@/state/position/types';
import {PositionData} from '@/types/data/positions';


const initialState: PositionState = {};

const slice = createSlice({
  name: POSITION_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      positionDispatchers[PositionDispatcherName.POSITION_UPDATE].fulfilled,
      (state, {payload}) => {
        const {contract, account, quantity, avgPx, unrealizedPnl, marketValue} = payload;
        const positionsOfAccount = state[account] ?? {};

        return {
          ...state,
          [account]: {
            ...positionsOfAccount,
            [contract.id]: {
              ...(positionsOfAccount[contract.id] ?? {
                dailyPnl: null,
                realizedPnl: 0,
              }),
              unrealizedPnl,
              quantity,
              avgPx,
              marketValue,
              costBasis: avgPx * quantity * contract.multiplier,
            },
          },
        };
      },
    );
    builder.addCase(
      positionDispatchers[PositionDispatcherName.PNL_UPDATE],
      (state, {payload}): PositionState => {
        const {account, contractId, quantity, dailyPnl, unrealizedPnl, realizedPnl, marketValue} = payload;

        const accountPosition = state[account];
        const originalPositionData: PositionData | undefined = accountPosition ?
          accountPosition[contractId] :
          undefined;

        if (!originalPositionData) {
          return state;
        }

        const positionData: PositionData = {
          ...originalPositionData,
          dailyPnl,
          unrealizedPnl,
          realizedPnl,
          quantity,
          marketValue,
        };

        return {
          ...state,
          [account]: {
            ...(accountPosition ?? {}),
            [contractId]: positionData,
          },
        };
      },
    );
  },
});

export default slice.reducer;
