import React from 'react';

import {Table} from '@/components/table/main';
import {TableRow} from '@/components/table/row';
import {useOptionContractMappingSelector} from '@/state/option/selector';
import {OptionChainDataCells} from '@/ui/options/chain/row';
import {OptionChainHeaderCells} from '@/ui/options/chain/table/headerCells';


export const OptionChainTable = () => {
  const contractMapping = useOptionContractMappingSelector();

  const strikeClassName = 'text-center bg-orange-900';

  return (
    <Table
      header={
        <>
          <OptionChainHeaderCells/>
          <td className={strikeClassName}>Strike</td>
          <OptionChainHeaderCells/>
        </>
      }
      body={contractMapping?.map(({strike, call, put}) => (
        <TableRow key={strike} className="text-right">
          <OptionChainDataCells contractId={call}/>
          <td className={strikeClassName}>{strike}</td>
          <OptionChainDataCells contractId={put}/>
        </TableRow>
      ))}
    />
  );
};
