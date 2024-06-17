import sum from 'lodash/sum';


type ToNormalizedOpts = {
  arr: number[],
  targetSum: number,
};

export const toNormalized = ({arr, targetSum}: ToNormalizedOpts) => {
  const arrSum = sum(arr);
  if (Math.abs(arrSum) < 1E-6) {
    return arr;
  }

  const multiplier = targetSum / arrSum;

  return arr.map((num) => num * multiplier);
};
