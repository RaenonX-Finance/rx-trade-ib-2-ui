import {OrderSide} from '@/enums/orderSide';
import {ContractModel} from '@/types/data/contract';


export type OrderRecordMessage = {
  account: string,
  orderId: number,
  contract: ContractModel,
  side: OrderSide,
  tif: string,
  type: string,
  price: number,
  filledQuantity: number,
  targetQuantity: number,
};

export type OrderUpdateMessage = {
  account: string,
  orderId: number,
  filledQuantity: number,
  targetQuantity: number,
};

export type OrderFilledMessage = {
  account: string,
  orderId: number,
};

export type OrderCancelledMessage = {
  account: string,
  orderId: number,
};
