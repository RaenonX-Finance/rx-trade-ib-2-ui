'use client';
import React from 'react';

import {clsx} from 'clsx';
import {Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {useOptionsGexCalcResult} from '@/ui/options/gex/chart/calc/hook';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {OptionsGexChartTooltip} from '@/ui/options/gex/chart/tooltip';
import {formatInt} from '@/utils/format/number/regular';


export const OptionsGexChart = () => {
  const {byStrike, possibleExpiry, total} = useOptionsGexCalcResult();

  return (
    <Flex>
      <Flex className="text-xl" center>
        $&nbsp;{formatInt(total)}
      </Flex>
      <Flex className="h-[70vh]">
        {
          !!byStrike.length &&
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStrike} stackOffset="sign" margin={{top: 0, right: 0, left: 0, bottom: 0}}>
              <XAxis
                dataKey={({strike}: OptionsGexData) => strike}
                className="text-xs"
              />
              <YAxis
                type="number"
                dataKey={({netGammaSum}: OptionsGexData) => netGammaSum}
                className="text-xs"
              />
              <Tooltip content={<OptionsGexChartTooltip/>}/>
              <ReferenceLine y={0} className="stroke-slate-400"/>
              {possibleExpiry.map((expiry) => (
                <Bar
                  key={expiry}
                  dataKey={({netGammaByExpiry}: OptionsGexData) => netGammaByExpiry[expiry]}
                  stackId="stack"
                >
                  {byStrike.map(({strike, netGammaSum}) => (
                    <Cell
                      key={strike}
                      className={clsx(netGammaSum ? 'fill-market-up' : 'fill-market-down')}
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
