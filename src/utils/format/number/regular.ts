import {NumberFormat} from '@/utils/format/number/type';
import {isNotNullish, Nullable} from '@/utils/type';


const formatNumberLocale = 'en-US';

export const formatter: {[format in NumberFormat]: ReturnType<typeof Intl.NumberFormat>} = {
  int: new Intl.NumberFormat(formatNumberLocale, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
  float1: new Intl.NumberFormat(formatNumberLocale, {minimumFractionDigits: 1, maximumFractionDigits: 1}),
  float: new Intl.NumberFormat(formatNumberLocale, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
  float3: new Intl.NumberFormat(formatNumberLocale, {minimumFractionDigits: 3, maximumFractionDigits: 3}),
  float4: new Intl.NumberFormat(formatNumberLocale, {minimumFractionDigits: 4, maximumFractionDigits: 4}),
};

const isValidNumberToFormat = (num: Nullable<number>): num is number => isNotNullish(num) && !isNaN(num);

export const formatInt = (num: Nullable<number>): string => {
  if (isValidNumberToFormat(num)) {
    return formatter.int.format(num);
  }

  return '-';
};

export const formatFloat1 = (num: Nullable<number>): string => {
  if (isValidNumberToFormat(num)) {
    return formatter.float1.format(num);
  }

  return '-';
};

export const formatFloat = (num: Nullable<number>): string => {
  if (isValidNumberToFormat(num)) {
    return formatter.float.format(num);
  }

  return '-';
};

export const formatFloat3 = (num: Nullable<number>): string => {
  if (isValidNumberToFormat(num)) {
    return formatter.float3.format(num);
  }

  return '-';
};

export const formatFloat4 = (num: Nullable<number>): string => {
  if (isValidNumberToFormat(num)) {
    return formatter.float4.format(num);
  }

  return '-';
};

type FormatToDigitsOpts = {
  num: Nullable<number>,
  digits: number,
};

export const formatToDigits = ({
  num,
  digits,
}: FormatToDigitsOpts) => {
  const numberFormat = new Intl.NumberFormat(
    formatNumberLocale,
    {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    },
  );

  if (isValidNumberToFormat(num)) {
    return numberFormat.format(num);
  }

  return '-';
};
