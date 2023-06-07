import {OrderRecordMessage} from '@/types/api/order';


export type Order = Omit<OrderRecordMessage, 'account'>;

export type OrderOfAccount = {[orderId in number]?: Order};
