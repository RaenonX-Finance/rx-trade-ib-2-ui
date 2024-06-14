'use client';
import React from 'react';

import {clsx} from 'clsx';

import {ToggleButton} from '@/components/inputs/toggleButton';
import {Table} from '@/components/table/main';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {usePositionContractIdsSelector} from '@/state/position/selector';
import {WindowLayout} from '@/ui/index/common/layout';
import {PositionRow} from '@/ui/index/positions/positionRow';
import {SummaryRow} from '@/ui/index/positions/summaryRow';
import {PositionFilter} from '@/ui/index/positions/type';


export const Positions = () => {
  const currentAccount = useCurrentAccountSelector();
  const positionContractIds = usePositionContractIdsSelector(currentAccount);

  const [filter, setFilter] = React.useState<PositionFilter>({
    holding: false,
    exited: false,
  });
  const {holding, exited} = filter;

  return (
    <WindowLayout className="w-full flex-col gap-2">
      <div className="h-full overflow-auto">
        <Table
          header={
            <>
              <td className="text-left">Symbol</td>
              <td>Last</td>
              <td>Bid</td>
              <td>Ask</td>
              <td>Mark</td>
              <td>Delta</td>
              <td>Qty</td>
              <td>Avg Px</td>
              <td>Basis</td>
              <td>Value</td>
              <td>Acct %</td>
              <td>Daily PnL</td>
              <td>%</td>
              <td>Total PnL</td>
              <td>%</td>
              <td className="text-center">Order</td>
              <td className="text-center">Traded</td>
            </>
          }
          body={
            <>
              {positionContractIds.map((contractId) => (
                <PositionRow key={contractId} contractId={contractId} filter={filter}/>
              ))}
              <SummaryRow/>
            </>
          }
        />
      </div>
      <div className="inline-flex justify-end gap-1">
        <ToggleButton
          active={holding}
          onClick={() => setFilter({...filter, holding: !holding})}
          text="Holding"
          getClassName={(active) => clsx(active && 'text-purple-300 hover:bg-purple-700')}
          className="hover:text-purple-300"
        />
        <ToggleButton
          active={exited}
          onClick={() => setFilter({...filter, exited: !exited})}
          text="Exited"
          getClassName={(active) => clsx(active && 'text-red-300 hover:bg-red-700')}
          className="hover:text-red-300"
        />
      </div>
    </WindowLayout>
  );
};
