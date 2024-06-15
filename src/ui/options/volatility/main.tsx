'use client';
import React from 'react';

import {WindowLayout} from '@/ui/index/common/layout';
import {OptionsVolatilityHistoryChart} from '@/ui/options/volatility/chart/main';
import {useOptionsVolatilityHistory} from '@/ui/options/volatility/hook';
import {OptionsVolatilityChartInput} from '@/ui/options/volatility/input';


export const OptionsVolatilityHistory = () => {
  const {
    state,
    setType,
    subscribeHistoryPx,
  } = useOptionsVolatilityHistory();

  return (
    <WindowLayout className="gap-1.5" fullHeight={false}>
      <div>Volatility History</div>
      <OptionsVolatilityChartInput state={state} setType={setType} onSubmit={subscribeHistoryPx}/>
      <OptionsVolatilityHistoryChart state={state}/>
    </WindowLayout>
  );
};
