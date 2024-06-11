import {clsx} from 'clsx';


export const getMarketColorClassOfNumber = (num: number) => {
  if (num === 0) {
    return clsx('text-slate-300');
  }

  return clsx(num >= 0 ? 'text-market-up' : 'text-market-down');
};
