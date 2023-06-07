import {makeInitData} from '@/components/chart/plot/onChanged/make';
import {handleChartEvent} from '@/components/chart/plot/onEvent/main';
import {handleLegend} from '@/components/chart/plot/onInit/legend';
import {handlePositioning} from '@/components/chart/plot/onInit/positioning';
import {ChartInitHandler} from '@/components/chart/type';


export const onChartInit: ChartInitHandler = (e) => {
  handleChartEvent(e);
  handleLegend(e);
  handlePositioning(e);

  return makeInitData(e);
};
