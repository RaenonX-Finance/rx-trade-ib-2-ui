import React from 'react';

import {clsx} from 'clsx';

import {useContractSelector} from '@/state/contract/selector';
import {usePxSelector} from '@/state/px/selector';
import {OptionDefinitionMessage} from '@/types/api/option';
import {formatFloat} from '@/utils/format/number/regular';
import {changeInfoToString, getChange} from '@/utils/math';
import {Nullable} from '@/utils/type';


const commonClasses = clsx('min-w-12 self-center rounded-md text-right text-sm');

type Props = {
  definition: Nullable<OptionDefinitionMessage>,
};

export const CurrentUnderlyingPx = ({definition}: Props) => {
  const px = usePxSelector(definition?.underlyingContractId);
  const contract = useContractSelector(definition?.underlyingContractId);

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
