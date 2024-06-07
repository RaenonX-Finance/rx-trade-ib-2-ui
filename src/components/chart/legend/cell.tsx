import React from 'react';

import {PxDirectionText} from '@/components/chart/legend/type';
import {formatSignedNumber} from '@/utils/format/number/signed';


export type LegendDataCellProps = {
  title?: React.ReactNode,
  value: string | number,
  direction?: PxDirectionText,
  digits?: number,
  large?: boolean,
  className?: string,
  classNameOfValue?: string,
};

export const LegendDataCell = ({
  title,
  value,
  direction,
  digits,
  large,
  className,
  classNameOfValue,
}: LegendDataCellProps) => {
  let valueClassName = '';

  if (direction === 'up') {
    valueClassName = 'text-bull-400';
  } else if (direction === 'down') {
    valueClassName = 'text-bear-400';
  }

  return (
    <div className={`inline whitespace-nowrap px-1 py-2 ${valueClassName} ${className}`}>
      {
        title &&
        <><span className="text-3xs">{title}</span>&nbsp;</>
      }
      <span className={classNameOfValue ?? (large ? '' : 'text-sm')}>
        {typeof value === 'number' ? formatSignedNumber({num: value, digits}) : value}
      </span>
    </div>
  );
};
