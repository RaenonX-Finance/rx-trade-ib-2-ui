import React from 'react';

import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {TooltipProps} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {Dollar} from '@/components/preset/dollar';
import {ProgressBarMulti} from '@/components/progressBar/multi/main';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';


export const OptionsGexChartTooltip = ({active, payload}: TooltipProps<number, number>) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const {
    strike,
    netGammaByExpiry,
    netGammaSum,
  } = payload[0].payload as OptionsGexData;

  return (
    <Flex center className="min-w-48 gap-2 rounded-lg bg-slate-900/70 p-2">
      <span className="text-2xl">{strike}</span>
      <Dollar amount={netGammaSum.total} withColor className="self-end text-lg"/>
      <hr className="my-1 w-full border-t-gray-500"/>
      <Flex className="gap-1">
        {Object.entries(netGammaByExpiry).map(([expiry, netGamma]) => {
          if (netGamma == null) {
            return null;
          }

          const {call, put, total} = netGamma;
          const expiryFormatted = format(parse(expiry, 'yyyyMMdd', new Date()), 'yyyy-MM-dd');

          return (
            <Flex key={expiry} className="gap-0.5">
              <small className="whitespace-nowrap">{expiryFormatted}</small>
              <Dollar amount={total} withColor className="self-end"/>
              <ProgressBarMulti
                data={[{value: call, data: call}, {value: put, data: put}]}
                renderSummary={({data}) => <Dollar amount={data} withColor/>}
                classOfColors={['bg-market-up', 'bg-market-down']}
                className="gap-1 text-xs"
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
