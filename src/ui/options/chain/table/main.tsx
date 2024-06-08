'use client';
import React from 'react';

import {clsx} from 'clsx';

import {Table} from '@/components/table/main';
import {TableRow} from '@/components/table/row';
import {useOptionChainContractsSelector} from '@/state/option/selector';
import {OptionChainHeaderCells} from '@/ui/options/chain/table/headerCells';
import {OptionChainDataCells} from '@/ui/options/chain/table/row';


const strikeClassName = clsx('bg-orange-900 text-center');

export const OptionChainTable = () => {
  const contracts = useOptionChainContractsSelector();

  return (
    <Table
      header={
        <>
          <OptionChainHeaderCells/>
          <td className={strikeClassName}>Strike</td>
          <OptionChainHeaderCells/>
        </>
      }
      body={contracts.map(({strike, call, put}) => (
        <TableRow key={strike} className="text-right">
          <OptionChainDataCells contractId={call}/>
          <td className={strikeClassName}>{strike}</td>
          <OptionChainDataCells contractId={put}/>
        </TableRow>
      ))}
    />
  );
};
