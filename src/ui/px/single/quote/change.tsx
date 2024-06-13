import React from 'react';

import {clsx} from 'clsx';

import {QuotePxProps} from '@/ui/px/single/quote/type';
import {changeInfoToString, getChange} from '@/utils/math';
import {isSecurityTypeOptions} from '@/utils/pxData';


export const QuoteDailyChange = ({contract, px}: QuotePxProps) => {
  if (!px) {
    return null;
  }

  const change = getChange({
    original: px.Close,
    after: (isSecurityTypeOptions(contract?.securityType) && px.Bid && px.Ask) ? (px.Bid + px.Ask) / 2 : px.Last,
  });

  return (
    <span className={clsx(change?.textClass, 'whitespace-nowrap')}>
      {changeInfoToString(change, contract?.digits)}
    </span>
  );
};
