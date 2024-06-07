import {formatInt} from '@/utils/format/number/regular';


export const getTzOffsetSeconds = (): number => {
  return (new Date()).getTimezoneOffset() * 60;
};

export const updateEpochSecToLocal = (epochSec: number): number => {
  return epochSec - getTzOffsetSeconds();
};

export const updateEpochSecToUtc = (epochSec: number): number => {
  return epochSec + getTzOffsetSeconds();
};

export const formatTotalSecs = (secLeft: number): string => {
  if (secLeft < 60) {
    return formatInt(Math.floor(secLeft));
  }

  if (secLeft < 3600) {
    const min = Math.floor(secLeft / 60);
    const sec = Math.floor(secLeft % 60);
    return `${formatInt(min)}:${formatInt(sec).padStart(2, '0')}`;
  }

  const hour = Math.floor(secLeft / 3600);
  const min = Math.floor(secLeft % 3600 / 60);
  const sec = Math.floor(secLeft % 60);

  return `${hour}:${formatInt(min).padStart(2, '0')}:${formatInt(sec).padStart(2, '0')}`;
};
