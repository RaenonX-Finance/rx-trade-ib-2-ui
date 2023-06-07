import {createAction} from '@reduxjs/toolkit';

import {createOrderRecordThunk} from '@/state/order/thunk';
import {OrderDispatcherName} from '@/state/order/types';
import {OrderFilledMessage, OrderUpdateMessage} from '@/types/api/order';


export const orderDispatchers = {
  [OrderDispatcherName.MARK_CANCELLED]: createAction<OrderFilledMessage>(OrderDispatcherName.MARK_CANCELLED),
  [OrderDispatcherName.MARK_FILLED]: createAction<OrderFilledMessage>(OrderDispatcherName.MARK_FILLED),
  [OrderDispatcherName.RECORD_OPEN]: createOrderRecordThunk(OrderDispatcherName.RECORD_OPEN),
  [OrderDispatcherName.RECORD_COMPLETED]: createOrderRecordThunk(OrderDispatcherName.RECORD_COMPLETED),
  [OrderDispatcherName.UPDATE_STATUS]: createAction<OrderUpdateMessage>(OrderDispatcherName.UPDATE_STATUS),
};
