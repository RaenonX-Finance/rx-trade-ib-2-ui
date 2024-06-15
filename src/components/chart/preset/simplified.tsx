import React from 'react';

import {PxChart} from '@/components/chart/main';
import {LoadingPane} from '@/components/icons/loading/pane';
import {ChartData, ChartDataIdentifier} from '@/types/data/chart';
import {ContractInState} from '@/types/data/contract';
import {PartialNullable} from '@/utils/type';


type Props = PartialNullable<{
  chartData: ChartData,
  account: string,
  contract: ContractInState,
  identifier: ChartDataIdentifier,
  height: number,
  width: number,
}>;

export const SimplifiedChart = ({chartData, account, contract, identifier, width, height}: Props) => {
  if (!width || !height || !identifier) {
    return null;
  }

  if (!contract) {
    return <LoadingPane text="Contract"/>;
  }

  if (!chartData) {
    return <LoadingPane text="Chart"/>;
  }

  return (
    <PxChart
      // Force re-rendering the chart if `identifier` changes
      // Despite no effect under dev build, prod build will not change without this
      key={identifier}
      chartData={chartData}
      account={account}
      contract={contract}
      identifier={identifier}
      height={height}
      width={width}
      payload={{
        requestPxData: () => {
          // TODO: Chart - Request older px data
        },
      }}
      simplified
    />
  );
};
