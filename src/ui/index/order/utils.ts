import {OrderSide} from '@/enums/orderSide';
import {ContractInState} from '@/types/data/contract';
import {Order} from '@/types/data/order';
import {PxOfContract} from '@/types/data/px';


export const getSideClassName = (side: string): string => {
  side = side.toUpperCase();

  if (side === 'BUY') {
    return 'text-blue-400';
  }

  if (side === 'SELL') {
    return 'text-rose-400';
  }

  return '';
};

type GetOrderValueOpts = {
  contract: ContractInState | undefined,
  order: Order,
  isCancelled: boolean,
};

export const getOrderValue = ({contract, order, isCancelled}: GetOrderValueOpts): number => {
  if (isCancelled || !contract) {
    return NaN;
  }

  const {price, targetQuantity} = order;
  const {initialMargin} = contract;

  if (!initialMargin) {
    // No margin - just use [Px x Qty]
    return price * targetQuantity * contract.multiplier;
  }

  // Has margin - use margin as "Px" instead
  return targetQuantity * initialMargin;
};

type GetPxMoveToHitOpts = {
  px: PxOfContract,
  side: OrderSide,
  orderPx: number,
};

export const getPxMoveToHit = ({px, side, orderPx}: GetPxMoveToHitOpts): number | null => {
  const {Bid, Ask} = px;

  if (side === 'Buy' && Ask !== undefined) {
    return orderPx - Ask;
  }

  if (side === 'Sell' && Bid !== undefined) {
    return Bid - orderPx;
  }

  return null;
};
