import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {SignalRRequests} from '@/enums/signalRRequests';
import {PositionDispatcherName, PositionUpdateMessageForTransmit} from '@/state/position/types';
import {ReduxState} from '@/state/types';
import {onAsyncThunkError} from '@/state/utils';
import {PnlRequest, PositionPnlUpdateMessage} from '@/types/api/pnl';
import {PositionUpdateMessage} from '@/types/api/positions';
import {PxTickRequest} from '@/types/api/px';
import {getErrorMessage} from '@/utils/error';


export const positionDispatchers = {
  [PositionDispatcherName.POSITION_UPDATE]: createAsyncThunk<
    PositionUpdateMessage,
    PositionUpdateMessageForTransmit,
    {state: ReduxState, rejectValue: string}
  >(
    PositionDispatcherName.POSITION_UPDATE,
    async (payload, {getState, dispatch, rejectWithValue}) => {
      const {position} = getState();
      const {signalRConnection, account, contract} = payload;

      // !(account in position) - checking if the account is new in position state
      // !(contract.id in (position[account] ?? {})) - checking if the contract is new in position state
      if (!(account in position) || !(contract.id in (position[account] ?? {}))) {
        const pnlRequest: PnlRequest = {
          account,
          contractId: contract.id,
        };
        const pxDataRequest: PxTickRequest = {
          account,
          contractId: contract.id,
        };

        try {
          await signalRConnection.send(SignalRRequests.REQUEST_PNL, pnlRequest);
          await signalRConnection.send(SignalRRequests.REQUEST_PX_TICK, pxDataRequest);
        } catch (err) {
          return onAsyncThunkError({
            message: getErrorMessage({err}),
            data: payload,
            rejectWithValue,
            dispatch,
          });
        }
      }

      return payload;
    },
  ),
  [PositionDispatcherName.PNL_UPDATE]: createAction<PositionPnlUpdateMessage>(
    PositionDispatcherName.PNL_UPDATE,
  ),
};
