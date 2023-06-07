import React from 'react';


type Props = {
  quantity: number,
};

export const PositionQuantity = ({quantity}: Props) => {
  if (quantity == 0) {
    return <span className="text-xs">Exited</span>;
  }

  return <>{quantity}</>;
};
