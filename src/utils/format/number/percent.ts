import {isValidNumberToFormat} from '@/utils/format/number/common';
import {formatToDigits} from '@/utils/format/number/regular';
import {Nullable} from '@/utils/type';


type FormatPercentOpts = {
  percent: Nullable<number>,
  onFalsy?: string,
  digits?: number,
};

export const formatPercent = ({
  percent,
  onFalsy = '-',
  digits = 2,
}: FormatPercentOpts) => {
  if (!isValidNumberToFormat(percent)) {
    return onFalsy;
  }

  return `${formatToDigits({num: percent, digits})}%`;
};

type FormatPercentFromFractionOpts = {
  numerator: Nullable<number>,
  denominator: Nullable<number>,
  onFalsy?: string,
  digits?: number,
};

export const formatPercentFromFraction = ({
  numerator,
  denominator,
  onFalsy,
  digits,
}: FormatPercentFromFractionOpts): string => {
  if (numerator == null || denominator == null) {
    return onFalsy ?? '-';
  }

  return formatPercent({
    percent: numerator / denominator * 100,
    digits,
  });
};
