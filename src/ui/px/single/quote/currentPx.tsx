import React from 'react';

import {askClassName, bidClassName} from '@/components/colors/const';
import {ContractInState} from '@/types/data/contract';
import {PxOfContract} from '@/types/data/px';
import {getDeltaTextClass} from '@/ui/px/single/quote/utils';
import {isSecurityTypeFutures} from '@/utils/api';
import {getDigitsFromMinTick} from '@/utils/chart';

import styles from '../../main.module.css';


type Props = {
  contract: ContractInState | undefined,
  px: PxOfContract | undefined,
  lastPxFallback: number | undefined,
};

export const QuoteCurrentPx = ({contract, px, lastPxFallback}: Props) => {
  if (!contract) {
    return <>-</>;
  }

  const {securityType, details} = contract;
  const digits = getDigitsFromMinTick(details?.minTick ?? 0.01);

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
        <span>{px?.Last?.toFixed(digits) ?? lastPxFallback ?? '-'}</span>
        <span className={`${bidClassName} text-xs`}>B</span>
        <span className={`${bidClassName}`}>{px?.Bid?.toFixed(digits) ?? '-'}</span>
        <span className={`${askClassName} text-xs`}>A</span>
        <span className={`${askClassName}`}>{px?.Ask?.toFixed(digits) ?? '-'}</span>
      </div>
    );
  }

  throw new Error(`SecurityType: Unhandled security type to show current Px: ${securityType}`);
};
