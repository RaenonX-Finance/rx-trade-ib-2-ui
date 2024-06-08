import React from 'react';

import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {TooltipProps} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {Dollar} from '@/components/preset/dollar';
import {ProgressBarMulti} from '@/components/progressBar/multi/main';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {formatInt} from '@/utils/format/number/regular';


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
    <Flex center className="rounded-lg bg-slate-900/70 p-2">
      <span className="text-2xl">{strike}</span>
      <span className="self-end text-lg">$&nbsp;{formatInt(netGammaSum.total)}</span>
      <hr className="my-1 w-full border-t-gray-500"/>
      {Object.entries(netGammaByExpiry).map(([expiry, netGamma]) => {
        if (netGamma == null) {
          return null;
        }

        const {call, put, total} = netGamma;
        const expiryFormatted = format(parse(expiry, 'yyyyMMdd', new Date()), 'yyyy-MM-dd');

        return (
          <Flex key={expiry} direction="row" className="items-end justify-between gap-5">
            <small>{expiryFormatted}</small>
            <Dollar amount={total} withColor/>
            <ProgressBarMulti
              data={[{value: call, data: call}, {value: put, data: put}]}
              renderSummary={({data}) => <Dollar amount={data} withColor/>}
              className="text-xs"
            />
          </Flex>
        );
      })}
    </Flex>
  );
};
