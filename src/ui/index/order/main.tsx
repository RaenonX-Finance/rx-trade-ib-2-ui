'use client';
import React from 'react';

import {ToggleButton} from '@/components/inputs/toggleButton';
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
      <div className="inline-flex justify-end gap-1">
        <ToggleButton
          active={open}
          onChange={() => setFilter({...filter, open: !open})}
          id="Open"
          title="Open"
          className="hover:text-yellow-300 peer-checked:text-yellow-300 peer-checked:hover:bg-yellow-700"
        />
        <ToggleButton
          active={filled}
          onChange={() => setFilter({...filter, filled: !filled})}
          id="Filled"
          title="Filled"
          className="hover:text-green-300 peer-checked:text-green-300 peer-checked:hover:bg-green-700"
        />
        <ToggleButton
          active={cancelled}
          onChange={() => setFilter({...filter, cancelled: !cancelled})}
          id="Cancelled"
          title="Cancelled"
          className="hover:text-red-300 peer-checked:text-red-300 peer-checked:hover:bg-red-700"
        />
      </div>
    </WindowLayout>
  );
};
