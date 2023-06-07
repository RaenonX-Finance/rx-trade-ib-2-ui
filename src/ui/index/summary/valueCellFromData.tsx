import React from 'react';

import {AccountDataKey} from '@/enums/accountData';
import {AccountData} from '@/types/data/account';
import {AccountDataKeyTranslation} from '@/ui/index/summary/const';
import {SummaryValueCell} from '@/ui/index/summary/valueCell';


type Props = {
  data: AccountData | undefined,
  dataKey: AccountDataKey,
};

export const SummaryValueCellFromData = ({data, dataKey}: Props) => {
  return (
    <SummaryValueCell
      title={AccountDataKeyTranslation[dataKey]}
      value={data?.data[dataKey] || '-'}
    />
  );
};
