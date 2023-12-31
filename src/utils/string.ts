type FormatPercentOpts = {
  numerator: number | null | undefined,
  denominator: number | null | undefined,
  onFalsy?: string,
  digits?: number,
};

export const formatPercent = ({numerator, denominator, onFalsy = '-', digits = 2}: FormatPercentOpts): string => {
  if (numerator === null || numerator === undefined || denominator === null || denominator === undefined) {
    return onFalsy;
  }

  const percent = numerator / denominator * 100;

  if (isNaN(percent)) {
    return onFalsy;
  }

  return `${percent.toFixed(digits)}%`;
};

type FormatSignedNumberOpts = {
  num: number,
  digits?: number,
  sign?: boolean,
};

export const formatNumber = ({num, digits, sign}: FormatSignedNumberOpts): string => {
  return `${num > 0 && sign ? '+' : ''}${num.toFixed(digits ?? 2)}`;
};
