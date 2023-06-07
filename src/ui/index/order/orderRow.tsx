import React from 'react';

import {askClassName, bidClassName, orderPxClassName} from '@/components/colors/const';
import {TableRow} from '@/components/table/row';
import {useContractSelector} from '@/state/contract/selector';
import {usePxSelector} from '@/state/px/selector';
import {Order} from '@/types/data/order';
import {OrderExpectedPnL} from '@/ui/index/order/dataCell/expectedPnl';
import {OrderNetLiqPercent} from '@/ui/index/order/dataCell/netLiquidityPercent';
import {getOrderValue, getPxMoveToHit, getSideClassName} from '@/ui/index/order/utils';
import {classNames} from '@/utils/react';
import {formatPercent} from '@/utils/string';


type Props = {
  order: Order | undefined,
  isCompleted?: boolean,
  className?: string,
};

export const OrderRow = ({order, isCompleted = false, className}: Props) => {
  const contract = useContractSelector(order?.contract.id);
  const px = usePxSelector(order?.contract.id);

  if (!order) {
    return <></>;
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
    <TableRow className={classNames(
      'text-right',
      isCancelled ? 'text-gray-500' : (isFilled ? 'text-green-500' : ''),
      'odd:bg-gray-900 even:bg-gray-800',
      className,
    )}>
      <td className="whitespace-nowrap text-left"><code>{contract?.localSymbol || contractOfOrder.id}</code></td>
      <td>{isFilled ? filledQtyText : `${filledQtyText} / ${targetQuantity}`}</td>
      <td className={classNames('text-center', getSideClassName(side))}>{side}</td>
      <td className="text-center">{tif}</td>
      <td className="text-center">{isCancelled ? 'CXL' : type}</td>
      <td className={orderPxClassName}>{price > 0 ? price.toFixed(2) : '-'}</td>
      <td className={bidClassName}>{px?.Bid?.toFixed(2) ?? '-'}</td>
      <td className={askClassName}>{px?.Ask?.toFixed(2) ?? '-'}</td>
      <td>{px?.Last?.toFixed(2) ?? '-'}</td>
      <td>{isOrderValueNaN ? '-' : orderValue.toFixed(2)}</td>
      <td>{pxMoveToHit?.toFixed(2) ?? '-'}</td>
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
