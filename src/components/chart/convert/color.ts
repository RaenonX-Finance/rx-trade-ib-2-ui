// All time constants are in `America/Chicago`
const euroOpenMinInDay = 120; // 02:00

const usOpenMinInDay = 510; // 08:30

const usMorningPeakEndMinInDay = 570; // 09:30

const usEveningPeakStartMinInDay = 780; // 13:00

const usCloseMinInDay = 900; // 15:00

const usFuturesCloseMinInDay = 960; // 16:00

const sessionColors = {
  preMarket: '#FF980092',
  regularMorning: '#2196f3',
  offPeak: '#E5444492',
  regularEvening: '#2bc46a',
  postMarket: '#71767792',
  nightHours: '#a87dfa92',
};

export const toSessionColor = (date: Date): string => {
  const minInDay = date.getHours() * 60 + date.getMinutes();

  // Euro opens
  if (minInDay >= euroOpenMinInDay && minInDay < usOpenMinInDay) {
    return sessionColors.preMarket;
  }

  // Morning peak
  if (minInDay >= usOpenMinInDay && minInDay < usMorningPeakEndMinInDay) {
    return sessionColors.regularMorning;
  }

  // Intraday off-peak
  if (minInDay >= usMorningPeakEndMinInDay && minInDay < usEveningPeakStartMinInDay) {
    return sessionColors.offPeak;
  }

  // Afternoon peak
  if (minInDay >= usEveningPeakStartMinInDay && minInDay < usCloseMinInDay) {
    return sessionColors.regularEvening;
  }

  // Regular close to futures close
  if (minInDay >= usCloseMinInDay && minInDay < usFuturesCloseMinInDay) {
    return sessionColors.postMarket;
  }

  return sessionColors.nightHours;
};

const positionColors = {
  profiting: 'rgba(38,166,153,0.5)',
  losing: 'rgba(239,83,80,0.5)',
  neutral: 'rgba(255,255,255,0.5)',
};

export const toPositionAvgPxColor = (totalPnl: number) => {
  if (totalPnl > 0) {
    return positionColors.profiting;
  }

  if (totalPnl < 0) {
    return positionColors.losing;
  }

  return positionColors.neutral;
};
