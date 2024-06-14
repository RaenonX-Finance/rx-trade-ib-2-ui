'use client';
import React from 'react';

import {clsx} from 'clsx';

import {ToggleButton} from '@/components/inputs/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {Table} from '@/components/table/main';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {useCancelledOrderSelector, useFilledOrderSelector, useOpenOrderSelector} from '@/state/order/selector';
import {WindowLayout} from '@/ui/index/common/layout';
import {OrderRow} from '@/ui/index/order/orderRow';
import {OrderFilter} from '@/ui/index/order/type';
import {isAllValueFalse} from '@/utils/record';


export const Orders = () => {
  const currentAccount = useCurrentAccountSelector();
  const openOrders = useOpenOrderSelector(currentAccount);
  const filledOrders = useFilledOrderSelector(currentAccount);
  const cancelledOrders = useCancelledOrderSelector(currentAccount);
  const [filter, setFilter] = React.useState<OrderFilter>({
    open: false,
    filled: false,
    cancelled: false,
  });
  const {open, filled, cancelled} = filter;
  const showAll = isAllValueFalse(filter);

  return (
    <WindowLayout className="gap-common flex-col">
      <div className="h-full overflow-auto">
        <Table
          header={
            <>
              <td className="text-left">Symbol</td>
              <td>Quantity</td>
              <td className="text-center">Side</td>
              <td className="text-center">TIF</td>
              <td className="text-center">Type</td>
              <td>Price</td>
              <td>Bid</td>
              <td>Ask</td>
              <td>Last</td>
              <td>Value</td>
              <td>$ to Hit</td>
              <td>%</td>
              <td>Expected PnL</td>
              <td>Acct %</td>
            </>
          }
          body={
            <>
              {Object
                .entries((showAll || open) ? (openOrders || {}) : {})
                .map(([orderId, order]) => (
                  <OrderRow key={orderId} order={order}/>
                ))}
              {Object
                .entries((showAll || filled) ? (filledOrders || {}) : {})
                .map(([orderId, order]) => (
                  <OrderRow key={orderId} isCompleted order={order}/>
                ))}
              {Object
                .entries((showAll || cancelled) ? (cancelledOrders || {}) : {})
                .map(([orderId, order]) => (
                  <OrderRow key={orderId} isCompleted order={order}/>
                ))}
            </>
          }
        />
        {
          !openOrders && !filledOrders &&
          <div className="flex h-3/4 items-center justify-center">
            No orders
          </div>
        }
      </div>
      <Flex direction="row" noFullWidth className="gap-1 self-end">
        <ToggleButton
          active={open}
          onClick={() => setFilter({...filter, open: !open})}
          text="Open"
          getClassName={(active) => clsx(
            active ? 'text-yellow-300 hover:bg-yellow-700' : 'text-gray-500 hover:text-yellow-300',
          )}
        />
        <ToggleButton
          active={filled}
          onClick={() => setFilter({...filter, filled: !filled})}
          text="Filled"
          getClassName={(active) => clsx(
            active ? 'text-gray-500 hover:text-green-300' : 'text-green-300 hover:bg-green-700',
          )}
        />
        <ToggleButton
          active={cancelled}
          onClick={() => setFilter({...filter, cancelled: !cancelled})}
          text="Cancelled"
          getClassName={(active) => clsx(
            active ? 'text-gray-500 hover:text-red-300' : 'text-red-300 hover:bg-red-700',
          )}
        />
      </Flex>
    </WindowLayout>
  );
};
