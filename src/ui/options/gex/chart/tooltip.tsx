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
import {useOptionGexUnderlyingPxSelector} from '@/state/option/selector';
import {getMarketColorClassOfText} from '@/styles/color/text';
import {OptionsGexData} from '@/ui/options/gex/chart/calc/type';
import {getReferencePx} from '@/utils/calc/tick';
import {formatFloat, formatInt} from '@/utils/format/number/regular';


export const OptionsGexChartTooltip = ({active, payload}: TooltipProps<number, number>) => {
  const spotPx = useOptionGexUnderlyingPxSelector();

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

  return (
    <Flex center className="min-w-48 gap-1 rounded-lg bg-slate-900/70 p-2">
      <Flex direction="row" className="items-end justify-center gap-1 leading-none">
        <span className="text-xl">{strike}</span>
        <span className={clsx('text-sm', getMarketColorClassOfText(spotStrikeDiffPercent))}>
          {formatFloat(spotStrikeDiffPercent)}%
        </span>
      </Flex>
      <Dollar amount={netGammaSum.total} withColor className="self-end text-2xl"/>
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

          return (
            <Flex key={expiry} className="w-48 gap-0.5">
              <Flex direction="row" center className="gap-0.5 whitespace-nowrap text-xs">
                <span>{expiryFormatted}</span>
                <span>(T-{daysToExpiry})</span>
              </Flex>
              <Dollar amount={total} withColor className="self-end text-lg"/>
              <ProgressBarMulti
                data={[{value: call, data: call}, {value: put, data: -put}]}
                // +0 for fixing -0 issue
                renderSummary={({data}) => <Dollar amount={data + 0} withColor/>}
                classOfColors={['bg-market-up', 'bg-market-down']}
                className="gap-1 text-xs"
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
