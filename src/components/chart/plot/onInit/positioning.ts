import {chartShowFromOpen} from '@/components/chart/positioning';
import {ChartInitPayload} from '@/components/chart/type';


export const handlePositioning = ({chartRef, chartDataRef, contract}: ChartInitPayload) => {
  if (!chartRef.current) {
    return;
  }

  chartShowFromOpen({
    chartRef,
    chartDataRef,
    contract,
  });
};
