import {Nullable} from '@/utils/type';


type FormatToAbbreviationOpts = {
  num: Nullable<number>,
  decimals?: number,
};

export const formatToAbbreviation = ({num, decimals}: FormatToAbbreviationOpts): string => {
  if (num == null) {
    return '-';
  }

  const numForCheck = Math.abs(num); // For handling negative number
  decimals = decimals ?? 1;

  if (numForCheck >= 1E9) {
    return `${(num / 1E9).toFixed(decimals)} B`;
  }

  if (numForCheck >= 1E6) {
    return `${(num / 1E6).toFixed(decimals)} M`;
  }

  if (numForCheck >= 1E3) {
    return `${(num / 1E3).toFixed(decimals)} K`;
  }

  return parseFloat(num.toFixed(decimals)).toString();
};
