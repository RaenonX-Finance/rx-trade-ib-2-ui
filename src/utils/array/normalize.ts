import sum from 'lodash/sum';


type ToNormalizedOpts = {
  arr: number[],
  targetSum: number,
};

export const toNormalized = ({arr, targetSum}: ToNormalizedOpts) => {
  const multiplier = targetSum / sum(arr);

  return arr.map((num) => num * multiplier);
};
