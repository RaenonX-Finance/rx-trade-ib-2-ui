'use client';
import React from 'react';

import {clsx} from 'clsx';
import {Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {Dollar} from '@/components/preset/dollar';
import {useOptionGexContractsSelector, useOptionGexExpectedExpirySelector} from '@/state/option/selector';
import {useOptionsGexCalcResult} from '@/ui/options/gex/chart/calc/hook';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {OptionsGexChartTooltip} from '@/ui/options/gex/chart/tooltip';
import {formatToAbbreviation} from '@/utils/format/number/abbreviation';


export const OptionsGexChart = () => {
  const {byStrike, possibleExpiry, total} = useOptionsGexCalcResult();
  const gexLoadedContracts = useOptionGexContractsSelector();
  const expectedExpiry = useOptionGexExpectedExpirySelector();

  const gexLoadedExpiry = React.useMemo(
    () => new Set([...gexLoadedContracts.map(({expiry}) => expiry)]),
    [gexLoadedContracts],
  );

  return (
    <Flex className="gap-2">
      <Flex className="text-3xl" center>
        <Dollar amount={total} withColor/>
      </Flex>
      <Flex direction="row" center wrap className="gap-2 text-xs">
        {expectedExpiry.map((expiry) => (
          <span key={expiry} className={clsx(
            'rounded-lg bg-slate-300/20 p-1',
            gexLoadedExpiry.has(expiry) ? 'text-green-400' : 'text-slate-400',
          )}>
            {expiry}
          </span>
        ))}
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
