import {makeInitData} from '@/components/chart/plot/onChanged/make';
import {handleChartEvent} from '@/components/chart/plot/onEvent/main';
import {handleLegend} from '@/components/chart/plot/onInit/legend';
import {handlePositioning} from '@/components/chart/plot/onInit/positioning';
import {ChartInitHandler} from '@/components/chart/type';


export const onChartInit: ChartInitHandler = (e) => {
  // Can't make and return immediately as `handlePositioning()`
  // needs an initialized chart (by `makeInitData()`) to work
  const initData = makeInitData(e);

  handleChartEvent(e);
  handleLegend(e);
  handlePositioning(e);

  return initData;
};
