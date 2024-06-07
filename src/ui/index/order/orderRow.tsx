import React from 'react';

import {clsx} from 'clsx';

import {TableRow} from '@/components/table/row';
import {useContractSelector} from '@/state/contract/selector';
import {usePxSelector} from '@/state/px/selector';
import {Order} from '@/types/data/order';
import {OrderExpectedPnL} from '@/ui/index/order/dataCell/expectedPnl';
import {OrderNetLiqPercent} from '@/ui/index/order/dataCell/netLiquidityPercent';
import {getOrderValue, getPxMoveToHit, getSideClassName} from '@/ui/index/order/utils';
import {formatPercent} from '@/utils/format/number/percent';
import {formatFloat} from '@/utils/format/number/regular';


type Props = {
  order: Order | undefined,
  isCompleted?: boolean,
  className?: string,
};

export const OrderRow = ({order, isCompleted = false, className}: Props) => {
  const contract = useContractSelector(order?.contract.id);
  const px = usePxSelector(order?.contract.id);

  if (!order) {
    return null;
  }

  const {
    contract: contractOfOrder,
    side,
    tif,
    type,
    price,
    filledQuantity,
    targetQuantity,
  } = order;

  const isCancelled = isCompleted && filledQuantity <= 0;
  const isFilled = isCompleted && filledQuantity > 0;
  const filledQtyText = isCancelled ?
    (filledQuantity > 0 ? filledQuantity : '-') :
    filledQuantity;
  const orderValue = getOrderValue({contract, order, isCancelled});
  const pxMoveToHit = px ? getPxMoveToHit({px, side, orderPx: price}) : null;
  const isOrderValueNaN = isNaN(orderValue);

  return (
    <TableRow className={clsx(
      'text-right',
      isCancelled ? 'text-gray-500' : (isFilled ? 'text-green-500' : ''),
      'odd:bg-gray-900 even:bg-gray-800',
      className,
    )}>
      <td className="whitespace-nowrap text-left"><code>{contract?.localSymbol || contractOfOrder.id}</code></td>
      <td>{isFilled ? filledQtyText : `${filledQtyText} / ${targetQuantity}`}</td>
      <td className={clsx('text-center', getSideClassName(side))}>{side}</td>
      <td className="text-center">{tif}</td>
      <td className="text-center">{isCancelled ? 'CXL' : type}</td>
      <td className="text-px-order">{price > 0 ? formatFloat(price) : '-'}</td>
      <td className="text-px-bid">{formatFloat(px?.Bid)}</td>
      <td className="text-px-ask">{formatFloat(px?.Ask)}</td>
      <td>{formatFloat(px?.Last) }</td>
      <td>{isOrderValueNaN ? '-' : formatFloat(orderValue)}</td>
      <td>{formatFloat(pxMoveToHit)}</td>
      <td>{formatPercent({numerator: pxMoveToHit, denominator: price})}</td>
      <td>
        {isOrderValueNaN ?
          '-' :
          <OrderExpectedPnL contract={contract} order={order} orderValue={orderValue}/>}
      </td>
      <td>{isOrderValueNaN || isFilled ? '-' : <OrderNetLiqPercent orderValue={orderValue}/>}</td>
    </TableRow>
  );
};
