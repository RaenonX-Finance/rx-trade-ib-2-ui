import {clsx} from 'clsx';


const getMarketColorClassOfFillOnUp = [
  clsx('fill-market-up/100'),
  clsx('fill-market-up/85'),
  clsx('fill-market-up/75'),
  clsx('fill-market-up/65'),
  clsx('fill-market-up/55'),
  clsx('fill-market-up/45'),
  clsx('fill-market-up/35'),
  clsx('fill-market-up/25'),
  clsx('fill-market-up/15'),
  clsx('fill-market-up/5'),
];

const getMarketColorClassOfFillOnDown = [
  clsx('fill-market-down/100'),
  clsx('fill-market-down/85'),
  clsx('fill-market-down/75'),
  clsx('fill-market-down/65'),
  clsx('fill-market-down/55'),
  clsx('fill-market-down/45'),
  clsx('fill-market-down/35'),
  clsx('fill-market-down/25'),
  clsx('fill-market-down/15'),
  clsx('fill-market-down/5'),
];

export const getMarketColorClassOfFill = (num: number, idx: number) => {
  if (num === 0) {
    return clsx('fill-slate-300');
  }

  return clsx(num > 0 ? getMarketColorClassOfFillOnUp[idx] : getMarketColorClassOfFillOnDown[idx]);
};
