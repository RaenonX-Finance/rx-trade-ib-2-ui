import {clsx} from 'clsx';

import {Nullable} from '@/utils/type';


export const getMarketColorClassOfText = (num: Nullable<number>) => {
  if (num == null) {
    return '';
  }

  if (num === 0) {
    return clsx('text-slate-300');
  }

  return clsx(num > 0 ? 'text-market-up' : 'text-market-down');
};
