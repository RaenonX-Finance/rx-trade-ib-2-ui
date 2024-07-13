'use client';
import React from 'react';

import {clsx} from 'clsx';

import {Table} from '@/components/table/main';
import {TableRow} from '@/components/table/row';
import {useOptionChainContractsSelector, useOptionChainDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {getMarketColorClassOfText} from '@/styles/color/text';
import {OptionChainHeaderCells} from '@/ui/options/chain/table/headerCells';
import {OptionChainDataCells} from '@/ui/options/chain/table/row';
import {getClosestStrikeFromContract} from '@/ui/options/common/utils';
import {getReferencePx} from '@/utils/calc/tick';
import {formatFloat} from '@/utils/format/number/regular';


export const OptionChainTable = () => {
  const contracts = useOptionChainContractsSelector();
  const definition = useOptionChainDefinitionSelector();
  const spotPx = usePxSelector(definition?.underlyingContractId);

  const closestStrike = React.useMemo(() => (
    getClosestStrikeFromContract({
      strikes: contracts.map(({strike}) => strike),
      spotPx: getReferencePx(spotPx),
    })
  ), [spotPx, contracts]);

  return (
    <Table
      header={
        <>
          <OptionChainHeaderCells/>
          <td className="!pr-1 text-center">Strike</td>
          <td className="!pl-1 text-center">%</td>
          <OptionChainHeaderCells/>
        </>
      }
      body={contracts.map(({strike, call, put}) => {
        const spotStrikeDiffPercent = (strike / getReferencePx(spotPx) - 1) * 100;

        return (
          <TableRow key={strike} className="text-right">
            <OptionChainDataCells contractId={call}/>
            <td className={clsx('!pr-1 text-center', strike === closestStrike ? 'bg-sky-600' : 'bg-slate-700')}>
              {strike}
            </td>
            <td className={clsx(
              '!pl-1 text-[75%]',
              strike === closestStrike ? 'bg-sky-800' : 'bg-slate-900',
              getMarketColorClassOfText(spotStrikeDiffPercent),
            )}>
              {formatFloat(spotStrikeDiffPercent)}%
            </td>
            <OptionChainDataCells contractId={put}/>
          </TableRow>
        );
      })}
    />
  );
};
