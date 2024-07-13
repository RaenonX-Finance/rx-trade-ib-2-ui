'use client';
import React from 'react';

import {WindowLayout} from '@/ui/index/common/layout';
import {OptionPxQuoteRequest} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexChart} from '@/ui/options/gex/chart/main';
import {OptionsGexInput} from '@/ui/options/gex/input';


export const OptionsGex = () => {
  const [
    request,
    setRequest,
  ] = React.useState<OptionPxQuoteRequest | null>();

  return (
    <WindowLayout className="gap-1.5" fullHeight={false}>
      <div>GEX</div>
      <OptionsGexInput onUnderlyingContractUpdated={({
        source,
        symbol,
        spotPxOverride,
        expiryMaxDays,
        rangePercent,
      }) => {
        if (!rangePercent || !expiryMaxDays) {
          return;
        }

        setRequest({
          source,
          rangePercent,
          expiryDays: expiryMaxDays,
          ticker: symbol,
          spotPx: spotPxOverride,
        });
      }}/>
      <OptionsGexChart request={request}/>
    </WindowLayout>
  );
};
