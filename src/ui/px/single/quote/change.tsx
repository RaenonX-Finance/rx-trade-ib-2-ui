import React from 'react';

import {PxOfContract} from '@/types/data/px';
import {getDailyChange} from '@/utils/calc/px';
import {changeInfoToString} from '@/utils/math';
import {classNames} from '@/utils/react';


type Props = {
  px: PxOfContract | undefined,
};

export const QuoteDailyChange = ({px}: Props) => {
  if (!px) {
    return <></>;
  }

  const change = getDailyChange(px);

  return <span className={classNames(change?.textClass, 'whitespace-nowrap')}>{changeInfoToString(change)}</span>;
};
