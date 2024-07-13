import {createAsyncThunk} from '@reduxjs/toolkit';

import {SignalRRequests} from '@/enums/signalRRequests';
import {OrderDispatcherName, OrderRecordMessageForTransmit} from '@/state/order/types';
import {ReduxState} from '@/state/types';
import {onAsyncThunkError} from '@/state/utils/handler';
import {OrderRecordMessage} from '@/types/api/order';
import {PxTickRequest} from '@/types/api/px';
import {getErrorMessage} from '@/utils/error';


export const createOrderRecordThunk = (dispatcherName: OrderDispatcherName) => createAsyncThunk<
  OrderRecordMessage,
  OrderRecordMessageForTransmit,
  {state: ReduxState, rejectValue: string}
>(
  dispatcherName,
  async (payload, {getState, dispatch, rejectWithValue}) => {
    const {px} = getState();
    const {signalRConnection, account, contract} = payload;

    if (!(contract.id in px)) {
      const pxTickRequest: PxTickRequest = {
        account,
        contractId: contract.id,
      };

      try {
        await signalRConnection.send(SignalRRequests.SUBSCRIBE_PX_TICK, pxTickRequest);
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
);
