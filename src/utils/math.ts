import {TailwindTextClass} from '@/types/tailwind';
import {formatNumber} from '@/utils/string';


type GetChangeOpts = {
  original: number | undefined,
  after: number | undefined,
};

export type ChangeInfo = {
  changePct: number,
  changeAmt: number,
  textClass: TailwindTextClass,
};

export const getChange = ({original, after}: GetChangeOpts): ChangeInfo | undefined => {
  if (!after || !original) {
    return undefined;
  }

  const changeAmt = after - original;

  let textClass: TailwindTextClass = 'text-gray-300';
  if (changeAmt > 0) {
    textClass = 'text-green-300';
  } else if (changeAmt < 0) {
    textClass = 'text-red-300';
  }

  return {
    changeAmt,
    changePct: changeAmt / original * 100 * (Math.sign(original)),
    textClass,
  };
};

export const changeInfoToString = (changeInfo: ChangeInfo | undefined, digits: number | undefined = 2): string => {
  if (!changeInfo) {
    return '-';
  }

  const {changePct, changeAmt} = changeInfo;
  const changeAmtString = formatNumber({num: changeAmt, digits, sign: true});
  const changePctString = formatNumber({num: changePct, digits: 2, sign: true});

  return `${changeAmtString} (${changePctString}%)`;
};
