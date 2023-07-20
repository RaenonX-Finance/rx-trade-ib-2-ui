import React from 'react';

import {TradingViewChart, TradingViewChartProps} from '@/components/chart/base/main';
import {ChartConfigPanel} from '@/components/chart/config/ui/main';
import {ChartConfigSingle} from '@/components/chart/config/ui/type';
import {toLegendDataFromChartData} from '@/components/chart/convert/legend';
import {ChartCompleteLegend} from '@/components/chart/legend/complete/main';
import {ChartLegendForExtrema} from '@/components/chart/legend/extrema/main';
import {ChartSimplifiedLegend} from '@/components/chart/legend/simplified/main';
import {onChartInit} from '@/components/chart/plot/onInit/main';
import {onChartUpdated} from '@/components/chart/plot/onUpdate/main';
import {ChartInitData, ChartLegendData, ChartPayload} from '@/components/chart/type';
import {useCompletePxUpdateSelector} from '@/state/chartMeta/selector';
import {usePositionSelector} from '@/state/position/selector';
import {ChartData, ChartDataIdentifier} from '@/types/data/chart';


type Props = Omit<
  TradingViewChartProps<
    ChartData,
    ChartPayload,
    ChartInitData,
    ChartLegendData,
    ChartConfigSingle
  >,
  'initChart' |
  'calcAddons' |
  'renderAddons' |
  'renderChartConfig' |
  'onDataUpdated' |
  'getIdentifier' |
  'getCompleteUpdateDeps' |
  'getPartialUpdateDeps' |
  'getAutoFixRangeDeps' |
  'position'
> & {
  identifier: ChartDataIdentifier,
  account: string | undefined,
};

export const PxChart = (props: Props) => {
  const {identifier, account, contract, simplified} = props;
  const completeUpdate = useCompletePxUpdateSelector(contract.id);
  const position = usePositionSelector(account, contract.id);

  return (
    <TradingViewChart
      initChart={onChartInit}
      onDataUpdated={onChartUpdated}
      calcAddons={{
        legend: (data, seriesType) => toLegendDataFromChartData({
          data,
          seriesType,
          digits: contract?.details?.minTick ?? 0.01,
        }),
      }}
      renderAddons={{
        legend: (legend) => (
          simplified ?
            <ChartSimplifiedLegend legend={legend}/> :
            <ChartCompleteLegend legend={legend}/>
        ),
        extrema: (legend) => <ChartLegendForExtrema legend={legend}/>,
      }}
      renderChartConfig={({chartConfig, setChartConfig, show, setShow}) => (
        <ChartConfigPanel
          contract={contract}
          identifier={identifier}
          config={chartConfig}
          setConfig={setChartConfig}
          show={show}
          setShow={setShow}
          configCheckOptions={{
            simplified,
          }}
        />
      )}
      getIdentifier={() => identifier}
      getCompleteUpdateDeps={() => [completeUpdate]}
      getAutoFixRangeDeps={(chartData) => [chartData.bars.length]}
      position={position}
      {...props}
    />
  );
};
