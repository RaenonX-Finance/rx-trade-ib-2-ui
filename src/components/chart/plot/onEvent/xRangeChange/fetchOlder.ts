import {HandleXrangeChangeOpts} from '@/components/chart/plot/onEvent/xRangeChange/type';


export const handleXrangeChangeFetchOlder = ({e, barsInfo}: HandleXrangeChangeOpts) => {
  if (!barsInfo || barsInfo.barsBefore > 100) {
    return;
  }

  const {requestPxData} = e;

  requestPxData(e.chartDataRef.current.bars.length);
};
