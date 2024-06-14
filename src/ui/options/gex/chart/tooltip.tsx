import React from 'react';

import {differenceInDays} from 'date-fns/differenceInDays';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {TooltipProps} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
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
    <Flex center className="min-w-48 gap-1 rounded-lg bg-slate-900/70 p-2">
      <span className="text-2xl">{strike}</span>
      <Dollar amount={netGammaSum.total} withColor className="self-end text-lg"/>
      <hr className="my-1 w-full border-t-gray-500"/>
      <Grid className="grid-cols-3 gap-3">
        {Object.entries(netGammaByExpiry).map(([expiry, netGamma]) => {
          if (netGamma == null) {
            return null;
          }

          const {call, put, total} = netGamma;
          const expiryDate = parse(expiry, 'yyyyMMdd', new Date());
          const expiryFormatted = format(expiryDate, 'yyyy-MM-dd');
          const daysToExpiry = differenceInDays(expiryDate, new Date());

          return (
            <Flex key={expiry} className="w-44 gap-0.5">
              <Flex direction="row" center className="gap-0.5 whitespace-nowrap text-xs">
                <span>{expiryFormatted}</span>
                <span>(T-{daysToExpiry})</span>
              </Flex>
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
      </Grid>
    </Flex>
  );
};
