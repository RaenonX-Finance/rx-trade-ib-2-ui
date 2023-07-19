import React from 'react';

import {askClassName, bidClassName} from '@/components/colors/const';
import styles from '@/ui/px/main.module.css';
import {QuotePxProps} from '@/ui/px/single/quote/type';
import {getDeltaTextClass} from '@/ui/px/single/quote/utils';
import {isSecurityTypeFutures} from '@/utils/api';


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
    return <>{px?.Last?.toFixed(digits) ?? lastPxFallback ?? '-'}</>;
  }

  // Options
  if (securityType === 'Options') {
    const mid = ((px?.Bid ?? NaN) + (px?.Ask ?? NaN)) / 2;

    return (
      <div className={styles['current-px']}>
        <span className="text-2xs">M</span>
        <span>{isNaN(mid) ? lastPxFallback?.toFixed(digits) ?? '-' : mid.toFixed(digits)}</span>
        <span className="text-2xs text-gray-400">T</span>
        <span className="text-gray-400">{px?.Mark?.toFixed(digits) ?? '-'}</span>
        <span className={`${getDeltaTextClass(px?.Delta)} text-2xs`}>&Delta;</span>
        <span className={getDeltaTextClass(px?.Delta)}>{px?.Delta?.toFixed(4) ?? '-'}</span>
      </div>
    );
  }

  // Stocks
  if (securityType === 'Stocks') {
    return (
      <div className={styles['current-px']}>
        <span className="text-xs">L</span>
        <span>{px?.Last?.toFixed(digits) ?? lastPxFallback?.toFixed(digits) ?? '-'}</span>
        <span className={`${bidClassName} text-xs`}>B</span>
        <span className={`${bidClassName}`}>{px?.Bid?.toFixed(digits) ?? '-'}</span>
        <span className={`${askClassName} text-xs`}>A</span>
        <span className={`${askClassName}`}>{px?.Ask?.toFixed(digits) ?? '-'}</span>
      </div>
    );
  }

  throw new Error(`SecurityType: Unhandled security type to show current Px: ${securityType}`);
};
