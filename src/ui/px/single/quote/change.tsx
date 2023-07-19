import React from 'react';

import {QuotePxProps} from '@/ui/px/single/quote/type';
import {isSecurityTypeOptions} from '@/utils/api';
import {changeInfoToString, getChange} from '@/utils/math';
import {classNames} from '@/utils/react';


export const QuoteDailyChange = ({contract, px}: QuotePxProps) => {
  if (!px) {
    return <></>;
  }

  const change = getChange({
    original: px.Close,
    after: isSecurityTypeOptions(contract?.securityType) && px.Bid && px.Ask ? (px.Bid + px.Ask) / 2 : px.Last,
  });

  return <span className={classNames(change?.textClass, 'whitespace-nowrap')}>{changeInfoToString(change)}</span>;
};
