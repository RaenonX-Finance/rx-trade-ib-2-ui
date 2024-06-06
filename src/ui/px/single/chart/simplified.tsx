import React from 'react';

import {PxChart} from '@/components/chart/main';
import {LoadingPane} from '@/components/icons/loading/pane';
import {ChartData, ChartDataIdentifier} from '@/types/data/chart';
import {ContractInState} from '@/types/data/contract';


type Props = {
  chartData: ChartData | undefined,
  account: string | undefined,
  contract: ContractInState | undefined,
  identifier: ChartDataIdentifier | undefined,
  height: number | undefined,
  width: number | undefined,
};

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
