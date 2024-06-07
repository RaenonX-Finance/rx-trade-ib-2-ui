import React from 'react';

import {clsx} from 'clsx';

import {ContractInState} from '@/types/data/contract';
import {PxOfContract} from '@/types/data/px';
import {formatFloat} from '@/utils/format/number/regular';
import {changeInfoToString, getChange} from '@/utils/math';
import {Nullable} from '@/utils/type';


type Props = {
  px: Nullable<PxOfContract>,
  contract: Nullable<ContractInState>,
};

export const CurrentUnderlyingPx = ({px, contract}: Props) => {
  const commonClasses = clsx('min-w-12 self-center rounded-md text-right text-sm');
  const change = getChange({original: px?.Close, after: px?.Last});

  return (
    <>
      <div className={clsx(commonClasses, 'text-px-bid')}>{formatFloat(px?.Bid)}</div>
      <div className={clsx(commonClasses, 'text-px-ask')}>{formatFloat(px?.Ask)}</div>
      <div className={clsx(commonClasses)}>{formatFloat(px?.Last)}</div>
      <div className={clsx(commonClasses, 'w-28', change?.textClass)}>
        {changeInfoToString(change, contract?.digits)}
      </div>
    </>
  );
};
