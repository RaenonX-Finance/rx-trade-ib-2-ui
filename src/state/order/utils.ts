import {OrderState} from '@/state/order/types';
import {Order} from '@/types/data/order';


type MoveOrderFromOpenToCompletedOpts = {
  state: OrderState,
  account: string,
  orderId: number,
  target: Exclude<keyof OrderState, 'open'>
} & ({
  orderDefault?: never,
  orderEditor: (order: Order) => Order,
} | {
  orderDefault: Order,
  orderEditor?: never,
});

export const moveOrderFromOpenToCompleted = ({
  state,
  account,
  orderId,
  target,
  orderDefault,
  orderEditor,
}: MoveOrderFromOpenToCompletedOpts): OrderState => {
  const openOrderOfAccount = state.open[account] ?? {};
  const order = openOrderOfAccount[orderId];

  return {
    ...state,
    open: {
      ...state.open,
      [account]: {
        // Remove the order from `open` if it exists
        ...Object.fromEntries(
          Object.entries(state.open[account] ?? {})
            .filter(([orderIdKey, _]) => Number(orderIdKey) !== orderId),
        ),
      },
    },
    [target]: {
      ...state[target],
      [account]: {
        ...(state[target][account] ?? {}),
        [orderId]: (orderEditor && order) ? orderEditor(order) : orderDefault,
      },
    },
  };
};
