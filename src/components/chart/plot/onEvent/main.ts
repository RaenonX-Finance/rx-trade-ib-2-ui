import {handleCrosshairMove} from '@/components/chart/plot/onEvent/crosshairMove';
import {handleXrangeChange} from '@/components/chart/plot/onEvent/xRangeChange';
import {ChartInitPayload} from '@/components/chart/type';


export const handleChartEvent = (e: ChartInitPayload) => {
  const {chartRef} = e;

  if (!chartRef.current) {
    throw new Error('Legend to be handled while the chart is not ready');
  }

  chartRef.current.timeScale().subscribeVisibleLogicalRangeChange(handleXrangeChange(e));
  chartRef.current.subscribeCrosshairMove(handleCrosshairMove(e));
};
