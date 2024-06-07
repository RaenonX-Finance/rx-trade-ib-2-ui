import {formatToDigits} from '@/utils/format/number/regular';
import {Nullable} from '@/utils/type';


type FormatSignedNumberOpts = {
  num: Nullable<number>,
  digits?: number,
  sign?: boolean,
};

export const formatSignedNumber = ({num, digits, sign}: FormatSignedNumberOpts): string => {
  if (num == null) {
    return '-';
  }

  return `${num > 0 && sign ? '+' : ''}${formatToDigits({num, digits: digits ?? 2})}`;
};
