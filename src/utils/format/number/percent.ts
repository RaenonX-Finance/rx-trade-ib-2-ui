import {formatToDigits} from '@/utils/format/number/regular';


type FormatPercentFromFractionOpts = {
  numerator: number | null | undefined,
  denominator: number | null | undefined,
  onFalsy?: string,
  digits?: number,
};

export const formatPercentFromFraction = ({
  numerator,
  denominator,
  onFalsy = '-',
  digits = 2,
}: FormatPercentFromFractionOpts): string => {
  if (numerator === null || numerator === undefined || denominator === null || denominator === undefined) {
    return onFalsy;
  }

  const percent = numerator / denominator * 100;

  if (isNaN(percent)) {
    return onFalsy;
  }

  return `${formatToDigits({num: percent, digits})}%`;
};
