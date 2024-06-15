import React from 'react';

import {OptionsVolatilityHistoryChartLoaded} from '@/ui/options/volatility/chart/loaded';
import {OptionVolatilityActiveState} from '@/ui/options/volatility/type';


type Props = {
  state: OptionVolatilityActiveState | null,
};

export const OptionsVolatilityHistoryChart = ({state}: Props) => {
  return (
    <div className="h-60">
      {state && <OptionsVolatilityHistoryChartLoaded state={state}/>}
    </div>
  );
};
