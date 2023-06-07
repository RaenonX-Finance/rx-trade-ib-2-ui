import React from 'react';

import {PnlPercent} from '@/ui/index/positions/dataCell/pnlPercent';


type Props = {
  dailyPnl: number | null
};

export const PositionDailyPnlPercent = ({dailyPnl}: Props) => {
  return <PnlPercent pnl={dailyPnl}/>;
};
