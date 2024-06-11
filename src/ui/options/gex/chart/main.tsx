'use client';
import React from 'react';

import {clsx} from 'clsx';
import {Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {Dollar} from '@/components/preset/dollar';
import {useOptionsGexCalcResult} from '@/ui/options/gex/chart/calc/hook';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {OptionsGexChartTooltip} from '@/ui/options/gex/chart/tooltip';
import {formatToAbbreviation} from '@/utils/format/number/abbreviation';


export const OptionsGexChart = () => {
  const {byStrike, possibleExpiry, total} = useOptionsGexCalcResult();

  return (
    <Flex className="gap-2">
      <Flex className="text-2xl" center>
        <Dollar amount={total} withColor/>
      </Flex>
      <Flex className="h-[70vh]">
        {
          !!byStrike.length &&
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStrike} stackOffset="sign" margin={{top: 0, right: 0, left: -15, bottom: 0}}>
              <XAxis
                type="category"
                dataKey={({strike}: OptionsGexData) => strike}
                className="text-xs"
                stroke="white"
              />
              <YAxis
                type="number"
                className="text-xs"
                stroke="white"
                tickFormatter={(value) => formatToAbbreviation({num: value, decimals: 0})}
              />
              <Tooltip content={<OptionsGexChartTooltip/>} cursor={{fill: 'transparent'}}/>
              <ReferenceLine y={0} className="stroke-slate-300"/>
              {possibleExpiry.map((expiry) => (
                <Bar
                  key={expiry}
                  dataKey={({netGammaByExpiry}: OptionsGexData) => netGammaByExpiry[expiry]?.total}
                  stackId="stack"
                >
                  {byStrike.map(({strike, netGammaByExpiry}) => (
                    <Cell
                      key={strike}
                      className={clsx(
                        (netGammaByExpiry[expiry]?.total ?? 0) > 0 ? 'fill-market-up' : 'fill-market-down',
                      )}
                    />
                  ))}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        }
      </Flex>
    </Flex>
  );
};
