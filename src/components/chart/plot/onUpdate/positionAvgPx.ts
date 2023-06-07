import {getPositionAvgPxOptions} from '@/components/chart/plot/seriesOptions';
import {ChartUpdatedPayload} from '@/components/chart/type';


export const handlePositionAvgPx = ({
  chartApiRef,
  chartDataRef,
  chartConfig,
  position,
  simplified,
}: ChartUpdatedPayload) => {
  chartApiRef.current?.initData.lines.positionAvgPx.applyOptions(getPositionAvgPxOptions({
    chartConfig,
    position,
    bars: chartDataRef.current.bars,
    simplified,
  }));
};
