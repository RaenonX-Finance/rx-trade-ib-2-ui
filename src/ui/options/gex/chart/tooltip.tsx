import React from 'react';

import {clsx} from 'clsx';
import {differenceInDays} from 'date-fns/differenceInDays';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {TooltipProps} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {Dollar} from '@/components/preset/dollar';
import {ProgressBarMulti} from '@/components/progress/bar/multi/main';
import {ProgressBarMultiData} from '@/components/progress/bar/multi/type';
import {ProgressBarSingle} from '@/components/progress/bar/single';
import {useOptionGexExpectedExpirySelector, useOptionGexUnderlyingPxSelector} from '@/state/option/selector';
import {getMarketColorClassOfBg} from '@/styles/color/bg';
import {getMarketColorClassOfText} from '@/styles/color/text';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {toNormalized} from '@/utils/array/normalize';
import {getReferencePx} from '@/utils/calc/tick';
import {formatFloat, formatInt} from '@/utils/format/number/regular';


export const OptionsGexChartTooltip = ({active, payload}: TooltipProps<number, number>) => {
  const spotPx = useOptionGexUnderlyingPxSelector();
  const expectedExpiry = useOptionGexExpectedExpirySelector();

  if (!active || !payload || !payload.length) {
    return null;
  }

  const {
    strike,
    netGammaByExpiry,
    netGammaSum,
    oiByExpiry,
  } = payload[0].payload as OptionsGexData;

  const spotStrikeDiffPercent = (strike / getReferencePx(spotPx) - 1) * 100;
  const netGammaDistribution: ProgressBarMultiData<number>[] = expectedExpiry.map((expiry) => ({
    value: Math.abs(netGammaByExpiry[expiry]?.total ?? 0),
    data: netGammaByExpiry[expiry]?.total ?? 0,
  }));
  const netGammaNormalized = Object.fromEntries(
    toNormalized({
      arr: netGammaDistribution.map(({value}) => value),
      targetSum: 100,
    })
      .map((percent, idx) => [expectedExpiry[idx], percent]),
  );

  return (
    <Flex center className="min-w-48 gap-1 rounded-lg bg-slate-900/70 p-2">
      <Flex direction="row" className="items-end justify-center gap-1 leading-none">
        <span className="text-xl">{strike}</span>
        <span className={clsx('text-sm', getMarketColorClassOfText(spotStrikeDiffPercent))}>
          {formatFloat(spotStrikeDiffPercent)}%
        </span>
      </Flex>
      <Dollar amount={netGammaSum.total} withColor className="self-end text-2xl"/>
      <ProgressBarMulti
        data={netGammaDistribution}
        classOfColors={netGammaDistribution.map((expiry, idx) => getMarketColorClassOfBg(
          expiry.data,
          idx,
        ))}
        classOfBarHeight="h-1.5"
      />
      <hr className="my-1 w-full border-t-gray-500"/>
      <Grid className="grid-cols-2 gap-3.5">
        {Object.entries(netGammaByExpiry).map(([expiry, netGamma]) => {
          if (netGamma == null) {
            return null;
          }

          const {call, put, total} = netGamma;
          const expiryDate = parse(expiry, 'yyyyMMdd', new Date());
          const expiryFormatted = format(expiryDate, 'yyyy-MM-dd');
          const daysToExpiry = differenceInDays(expiryDate, new Date());

          const oiOfExpiry = oiByExpiry[expiry];
          const distributionOfExpiry = netGammaNormalized[expiry];

          return (
            <Flex key={expiry} className="w-52 gap-0.5">
              <Flex direction="row" center className="gap-0.5 whitespace-nowrap text-xs">
                <span>{expiryFormatted}</span>
                <span>(T-{daysToExpiry})</span>
              </Flex>
              <Flex direction="row" className="items-end justify-between gap-3">
                <span className="text-xs leading-none">{formatFloat(distributionOfExpiry)}%</span>
                <Dollar amount={total} withColor className="text-lg"/>
              </Flex>
              <ProgressBarSingle percent={distributionOfExpiry} classBarHeight="h-1"/>
              <ProgressBarMulti
                data={[{value: call, data: call}, {value: put, data: -put}]}
                // +0 for fixing -0 issue
                renderSummary={({data}) => <Dollar amount={data + 0} withColor/>}
                classOfColors={['bg-market-up', 'bg-market-down']}
                className="gap-1 text-xs"
                classOfBarHeight="h-1.5"
              />
              <Flex direction="row" className="items-end gap-1 text-xs leading-none">
                <small className="text-market-up">C</small>
                <span className="text-market-up">{formatInt(oiOfExpiry?.call)}</span>
                <small className="ml-auto text-market-down">P</small>
                <span className="text-market-down">{formatInt(oiOfExpiry?.put)}</span>
              </Flex>
            </Flex>
          );
        })}
      </Grid>
    </Flex>
  );
};
