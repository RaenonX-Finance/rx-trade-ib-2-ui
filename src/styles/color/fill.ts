import {clsx} from 'clsx';


const getMarketColorClassOfFillOnUp = [
  clsx('fill-market-up/100'),
  clsx('fill-market-up/90'),
  clsx('fill-market-up/80'),
  clsx('fill-market-up/70'),
  clsx('fill-market-up/60'),
  clsx('fill-market-up/50'),
  clsx('fill-market-up/40'),
  clsx('fill-market-up/30'),
  clsx('fill-market-up/20'),
  clsx('fill-market-up/10'),
];

const getMarketColorClassOfFillOnDown = [
  clsx('fill-market-down/100'),
  clsx('fill-market-down/90'),
  clsx('fill-market-down/80'),
  clsx('fill-market-down/70'),
  clsx('fill-market-down/60'),
  clsx('fill-market-down/50'),
  clsx('fill-market-down/40'),
  clsx('fill-market-down/30'),
  clsx('fill-market-down/20'),
  clsx('fill-market-down/10'),
];

export const getMarketColorClassOfFill = (num: number, idx: number) => {
  if (num === 0) {
    return clsx('fill-slate-300');
  }

  return clsx(num > 0 ? getMarketColorClassOfFillOnUp[idx] : getMarketColorClassOfFillOnDown[idx]);
};
