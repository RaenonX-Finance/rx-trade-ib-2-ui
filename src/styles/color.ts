import {clsx} from 'clsx';


export const getMarketColorClassOfNumber = (num: number) => clsx(
  num >= 0 ? 'text-market-up' : 'text-market-down',
);
