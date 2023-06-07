import {LogicalRangeChangeEventHandler} from 'lightweight-charts';

import {handleXrangeChangeExtrema} from '@/components/chart/plot/onEvent/xRangeChange/extrema';
import {handleXrangeChangeFetchOlder} from '@/components/chart/plot/onEvent/xRangeChange/fetchOlder';
import {ChartInitPayload} from '@/components/chart/type';


export const handleXrangeChange = (e: ChartInitPayload): LogicalRangeChangeEventHandler => (
  logicalRange,
) => {
  const {chartApiRef} = e;

  if (!logicalRange || !chartApiRef.current) {
    return;
  }

  const barsInfo = chartApiRef.current.initData.series.barsInLogicalRange(logicalRange);

  handleXrangeChangeExtrema({e, barsInfo});
  handleXrangeChangeFetchOlder({e, barsInfo});
};
