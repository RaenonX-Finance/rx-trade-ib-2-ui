import {createSlice} from '@reduxjs/toolkit';

import {orderDispatchers} from '@/state/order/dispatchers';
import {ORDER_STATE_NAME, OrderDispatcherName, OrderState} from '@/state/order/types';
import {moveOrderFromOpenToCompleted} from '@/state/order/utils';


const initialState: OrderState = {
  open: {},
  filled: {},
  cancelled: {},
};

const slice = createSlice({
  name: ORDER_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      orderDispatchers[OrderDispatcherName.MARK_CANCELLED],
      (state, {payload}) => moveOrderFromOpenToCompleted({
        state,
        account: payload.account,
        orderId: payload.orderId,
        target: 'cancelled',
        orderEditor: (order) => order,
      }),
    );
    builder.addCase(
      orderDispatchers[OrderDispatcherName.MARK_FILLED],
      (state, {payload}) =>moveOrderFromOpenToCompleted({
        state,
        account: payload.account,
        orderId: payload.orderId,
        target: 'filled',
        orderEditor: (order) => ({
          ...order,
          filledQuantity: order.targetQuantity,
        }),
      }),
    );
    builder.addCase(
      orderDispatchers[OrderDispatcherName.RECORD_OPEN].fulfilled,
      (state, {payload}) => ({
        ...state,
        open: {
          ...state.open,
          [payload.account]: {
            ...(state.open[payload.account] ?? {}),
            [payload.orderId]: payload,
          },
        },
      }),
    );
    builder.addCase(
      orderDispatchers[OrderDispatcherName.RECORD_COMPLETED].fulfilled,
      (state, {payload}) => {
        const {account, orderId, filledQuantity} = payload;

        return moveOrderFromOpenToCompleted({
          state,
          account,
          orderId,
          target: filledQuantity > 0 ? 'filled' : 'cancelled',
          orderDefault: payload,
        });
      },
    );
    builder.addCase(
      orderDispatchers[OrderDispatcherName.UPDATE_STATUS],
      (state, {payload}) => {
        const {orderId, account, targetQuantity, filledQuantity} = payload;
        const orderOfAccount = state.open[account];

        if (!orderOfAccount) {
          return state;
        }

        const order = orderOfAccount[orderId];

        if (!order) {
          return state;
        }

        return {
          ...state,
          open: {
            ...state.open,
            [payload.account]: {
              ...orderOfAccount,
              [payload.orderId]: {
                ...order,
                targetQuantity,
                filledQuantity,
              },
            },
          },
        };
      },
    );
  },
});

export default slice.reducer;
