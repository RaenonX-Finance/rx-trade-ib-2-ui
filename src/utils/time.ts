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
    return Math.floor(secLeft).toFixed(0);
  }

  if (secLeft < 3600) {
    const min = Math.floor(secLeft / 60);
    const sec = Math.floor(secLeft % 60);
    return `${min.toFixed(0)}:${sec.toFixed(0).padStart(2, '0')}`;
  }

  const hour = Math.floor(secLeft / 3600);
  const min = Math.floor(secLeft % 3600 / 60);
  const sec = Math.floor(secLeft % 60);

  return `${hour}:${min.toFixed(0).padStart(2, '0')}:${sec.toFixed(0).padStart(2, '0')}`;
};
