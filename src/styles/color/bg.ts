import {clsx} from 'clsx';

import {mod} from '@/utils/number/mod';


const getMarketColorClassOfBgOnUp = [
  clsx('bg-market-up/100'),
  clsx('bg-market-up/85'),
  clsx('bg-market-up/75'),
  clsx('bg-market-up/65'),
  clsx('bg-market-up/55'),
  clsx('bg-market-up/45'),
  clsx('bg-market-up/35'),
  clsx('bg-market-up/25'),
  clsx('bg-market-up/15'),
  clsx('bg-market-up/5'),
];

const getMarketColorClassOfBgOnDown = [
  clsx('bg-market-down/100'),
  clsx('bg-market-down/85'),
  clsx('bg-market-down/75'),
  clsx('bg-market-down/65'),
  clsx('bg-market-down/55'),
  clsx('bg-market-down/45'),
  clsx('bg-market-down/35'),
  clsx('bg-market-down/25'),
  clsx('bg-market-down/15'),
  clsx('bg-market-down/5'),
];

export const getMarketColorClassOfBg = (num: number, idx: number) => {
  if (num === 0) {
    return clsx('bg-slate-300');
  }

  return num > 0 ?
    getMarketColorClassOfBgOnUp[mod(idx, getMarketColorClassOfBgOnUp.length)] :
    getMarketColorClassOfBgOnDown[mod(idx, getMarketColorClassOfBgOnDown.length)];
};
