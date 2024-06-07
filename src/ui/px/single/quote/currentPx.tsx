import React from 'react';

import {clsx} from 'clsx';

import styles from '@/ui/px/main.module.css';
import {QuotePxProps} from '@/ui/px/single/quote/type';
import {getDeltaTextClass} from '@/ui/px/single/quote/utils';
import {isSecurityTypeFutures} from '@/utils/api';
import {getMidPx} from '@/utils/calc/tick';
import {formatFloat4, formatToDigits} from '@/utils/format/number/regular';


type Props = QuotePxProps & {
  lastPxFallback: number | undefined,
};

export const QuoteCurrentPx = ({contract, px, lastPxFallback}: Props) => {
  if (!contract) {
    return <>-</>;
  }

  const {securityType, digits} = contract;

  // Futures
  if (isSecurityTypeFutures(securityType)) {
    return formatToDigits({num: px?.Last ?? lastPxFallback, digits});
  }

  // Options
  if (securityType === 'Options') {
    const mid = getMidPx(px);

    return (
      <div className={styles['current-px']}>
        <span className="text-2xs">M</span>
        <span>{formatToDigits({num: mid ?? lastPxFallback, digits})}</span>
        <span className="text-2xs text-gray-400">T</span>
        <span className="text-gray-400">{formatToDigits({num: px?.Mark, digits})}</span>
        <span className={clsx('text-2xs', getDeltaTextClass(px?.Delta))}>&Delta;</span>
        <span className={getDeltaTextClass(px?.Delta)}>{formatFloat4(px?.Delta)}</span>
      </div>
    );
  }

  // Stocks
  if (securityType === 'Stocks') {
    return (
      <div className={styles['current-px']}>
        <span className="text-xs">L</span>
        <span>{formatToDigits({num: px?.Last ?? lastPxFallback, digits})}</span>
        <span className="text-px-bid text-xs">B</span>
        <span className="text-px-bid">{formatToDigits({num: px?.Bid, digits})}</span>
        <span className="text-px-ask text-xs">A</span>
        <span className="text-px-ask">{formatToDigits({num: px?.Ask, digits})}</span>
      </div>
    );
  }

  throw new Error(`SecurityType: Unhandled security type to show current Px: ${securityType}`);
};
