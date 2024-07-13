import React from 'react';

import {clsx} from 'clsx';
import {Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {ToggleButton} from '@/components/inputs/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {Dollar} from '@/components/preset/dollar';
import {useOptionGexContractsSelector, useOptionGexExpectedExpirySelector} from '@/state/option/selector';
import {getMarketColorClassOfFill} from '@/styles/color/fill';
import {getClosestStrikeFromPx} from '@/ui/options/common/utils';
import {useOptionsGexCalcResult} from '@/ui/options/gex/chart/calc/hook';
import {OptionPxQuoteRequest} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {OptionsGexStats} from '@/ui/options/gex/chart/stats/main';
import {OptionsGexChartTooltip} from '@/ui/options/gex/chart/tooltip';
import {useOptionsGexStats} from '@/ui/options/gex/stats/hook';
import {formatToAbbreviation} from '@/utils/format/number/abbreviation';
import {Nullable} from '@/utils/type';


type Props = {
  request: Nullable<OptionPxQuoteRequest>,
};

export const OptionsGexChart = ({request}: Props) => {
  const {
    result,
    inactiveExpiry,
    setInactiveExpiry,
    gex,
  } = useOptionsGexCalcResult({request});
  const {
    byStrike,
    closestStrike,
    possibleExpiry,
    total,
  } = result;

  const gexLoadedContracts = useOptionGexContractsSelector();
  const expectedExpiry = useOptionGexExpectedExpirySelector();

  const {
    stats: gexStats,
    calculateGexStats,
  } = useOptionsGexStats({inactiveExpiry, override: gex});

  const gexLoadedExpiry = React.useMemo(
    () => new Set([...gexLoadedContracts.map(({expiry}) => expiry)]),
    [gexLoadedContracts],
  );

  const strikes = React.useMemo(() => byStrike.map(({strike}) => strike), [byStrike]);

  return (
    <Flex className="gap-2">
      <Flex className="text-3xl" center>
        <Dollar amount={total} withColor/>
      </Flex>
      <Flex direction="row" center wrap className="gap-2">
        {expectedExpiry.map((expiry) => (
          <ToggleButton
            key={expiry}
            active={!inactiveExpiry[expiry]}
            text={expiry}
            onClick={() => setInactiveExpiry((original) => ({
              ...original,
              [expiry]: !original[expiry],
            }))}
            disabled={!gexLoadedExpiry.has(expiry)}
            getClassName={(active) => clsx(active ? 'text-green-400' : 'text-red-400')}
            classOfText="text-xs"
            className={clsx(
              'disabled:bg-slate-800 disabled:text-slate-400',
              'enabled:ring-1 enabled:ring-inset enabled:ring-slate-600 enabled:hover:bg-slate-700',
            )}
          />
        ))}
      </Flex>
      <OptionsGexStats gexStats={gexStats} onRefreshClicked={calculateGexStats}/>
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
              <ReferenceLine y={0} className="[&>line]:stroke-slate-500"/>
              {closestStrike != null && <ReferenceLine x={closestStrike} className="[&>line]:stroke-sky-500"/>}
              {
                gexStats?.gammaFlip != null &&
                <ReferenceLine
                  x={getClosestStrikeFromPx({strikes, px: gexStats.gammaFlip})}
                  className="[&>line]:stroke-amber-500"
                />
              }
              {
                gexStats?.gammaField != null &&
                <ReferenceLine
                  x={getClosestStrikeFromPx({strikes, px: gexStats.gammaField})}
                  className="[&>line]:stroke-fuchsia-500"
                />
              }
              {possibleExpiry.map((expiry, idx) => (
                <Bar
                  key={expiry}
                  dataKey={({netGammaByExpiry}: OptionsGexData) => netGammaByExpiry[expiry]?.total}
                  stackId="stack"
                >
                  {byStrike.map(({strike, netGammaByExpiry}) => (
                    <Cell
                      key={strike}
                      className={clsx(getMarketColorClassOfFill(netGammaByExpiry[expiry]?.total ?? 0, idx))}
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
