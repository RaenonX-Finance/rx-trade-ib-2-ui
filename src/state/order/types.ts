import {HubConnection} from '@microsoft/signalr';

import {OrderRecordMessage} from '@/types/api/order';
import {OrderOfAccount} from '@/types/data/order';


export const ORDER_STATE_NAME = 'Order';

export enum OrderDispatcherName {
  MARK_CANCELLED = 'Order/MarkCancelled',
  MARK_FILLED = 'Order/MarkFilled',
  RECORD_OPEN = 'Order/RecordOpen',
  RECORD_COMPLETED = 'Order/RecordCompleted',
  UPDATE_STATUS = 'Order/UpdateStatus',
}

export type OrderOfStatus = {[accountId in string]?: OrderOfAccount};

export type OrderState = {
  open: OrderOfStatus,
  filled: OrderOfStatus,
  cancelled: OrderOfStatus,
};

export type OrderRecordMessageForTransmit = OrderRecordMessage & {
  signalRConnection: HubConnection,
};
