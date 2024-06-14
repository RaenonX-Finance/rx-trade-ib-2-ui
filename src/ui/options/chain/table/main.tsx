'use client';
import React from 'react';

import {clsx} from 'clsx';

import {Table} from '@/components/table/main';
import {TableRow} from '@/components/table/row';
import {useOptionChainContractsSelector, useOptionChainDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {OptionChainHeaderCells} from '@/ui/options/chain/table/headerCells';
import {OptionChainDataCells} from '@/ui/options/chain/table/row';
import {getClosestStrikeFromContract} from '@/ui/options/common/utils';


export const OptionChainTable = () => {
  const contracts = useOptionChainContractsSelector();
  const definition = useOptionChainDefinitionSelector();
  const spotPx = usePxSelector(definition?.underlyingContractId);

  const closestStrike = React.useMemo(() => (
    getClosestStrikeFromContract({strikes: contracts.map(({strike}) => strike), spotPx})
  ), [spotPx, contracts]);

  return (
    <Table
      header={
        <>
          <OptionChainHeaderCells/>
          <td className="text-center">Strike</td>
          <OptionChainHeaderCells/>
        </>
      }
      body={contracts.map(({strike, call, put}) => (
        <TableRow key={strike} className="text-right">
          <OptionChainDataCells contractId={call}/>
          <td className={clsx('text-center', strike === closestStrike ? 'bg-sky-600' : 'bg-slate-700')}>
            {strike}
          </td>
          <OptionChainDataCells contractId={put}/>
        </TableRow>
      ))}
    />
  );
};
