import React from 'react';

import {clsx} from 'clsx';
import {Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Loading} from '@/components/icons/loading/icon';
import {ToggleButton} from '@/components/inputs/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {Dollar} from '@/components/preset/dollar';
import {getMarketColorClassOfFill} from '@/styles/color/fill';
import {getClosestStrikeFromPx} from '@/ui/options/common/utils';
import {useOptionsGexCalcResult} from '@/ui/options/gex/chart/calc/hook';
import {OptionPxQuoteRequest} from '@/ui/options/gex/chart/calc/px/type';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {useOptionsGexChartParams} from '@/ui/options/gex/chart/hook';
import {OptionsGexStats} from '@/ui/options/gex/chart/stats/main';
import {OptionsGexChartTooltip} from '@/ui/options/gex/chart/tooltip';
import {useOptionsGexStats} from '@/ui/options/gex/stats/hook';
import {formatToAbbreviation} from '@/utils/format/number/abbreviation';
import {formatFloat} from '@/utils/format/number/regular';
import {Nullable} from '@/utils/type';


type Props = {
  request: Nullable<OptionPxQuoteRequest>,
};

export const OptionsGexChart = ({request}: Props) => {
  const {
    result,
    quote,
    inactiveExpiry,
    setInactiveExpiry,
    gex,
    isApiLoading,
  } = useOptionsGexCalcResult({request});
  const {
    byStrike,
    closestStrike,
    possibleExpiry,
    total,
  } = result;

  const {
    loadedExpiry,
    expectedExpiry,
  } = useOptionsGexChartParams({quote});

  const {
    stats: gexStats,
    calculateGexStats,
    isLoading,
  } = useOptionsGexStats({
    inactiveExpiry,
    autoRefresh: request?.source === 'ibkr',
    override: gex,
  });

  const strikes = React.useMemo(() => byStrike.map(({strike}) => strike), [byStrike]);

  return (
    <Flex className="gap-2">
      <Flex direction="row" center className="gap-1 p-1">
        <Dollar amount={total} withColor className="text-3xl"/>
        <small className="self-end text-slate-400">
          ({gexStats?.effectiveness ? formatFloat(gexStats.effectiveness * 100) : '-'}%)
        </small>
        {(isApiLoading || isLoading) && <Loading className="size-4"/>}
      </Flex>
      {
        !!expectedExpiry.length &&
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
              disabled={!loadedExpiry.has(expiry)}
              getClassName={(active) => clsx(active ? 'text-green-400' : 'text-red-400')}
              classOfText="text-xs"
              className={clsx(
                'disabled:bg-slate-800 disabled:text-slate-400',
                'enabled:ring-1 enabled:ring-inset enabled:ring-slate-600 enabled:hover:bg-slate-700',
              )}
            />
          ))}
        </Flex>
      }
      <OptionsGexStats
        gexStats={gexStats}
        underlyingPxOverride={request?.spotPx}
        onRefreshClicked={calculateGexStats}
      />
      <Flex className="h-[65vh]">
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
              <Tooltip
                content={<OptionsGexChartTooltip spotPxOverride={request?.spotPx} expectedExpiry={expectedExpiry}/>}
                cursor={{fill: 'transparent'}}
              />
              <ReferenceLine y={0} className="[&>line]:stroke-slate-500"/>
              {gex?.gammaFlip.map((gammaFlip) => (
                <ReferenceLine
                  key={gammaFlip}
                  x={getClosestStrikeFromPx({strikes, px: gammaFlip})}
                  className="[&>line]:stroke-amber-500"
                />
              ))}
              {
                gexStats?.gammaField != null &&
                <ReferenceLine
                  x={getClosestStrikeFromPx({strikes, px: gexStats.gammaField})}
                  className="[&>line]:stroke-fuchsia-500"
                />
              }
              {closestStrike != null && <ReferenceLine x={closestStrike} className="[&>line]:stroke-sky-500"/>}
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
