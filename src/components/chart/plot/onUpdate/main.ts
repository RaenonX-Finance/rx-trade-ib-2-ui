import {handleExtrema} from '@/components/chart/plot/onUpdate/extrema';
import {handleLegend} from '@/components/chart/plot/onUpdate/legend';
import {handlePositionAvgPx} from '@/components/chart/plot/onUpdate/positionAvgPx';
import {handlePxSeries} from '@/components/chart/plot/onUpdate/pxSeries/main';
import {ChartUpdatedHandler} from '@/components/chart/type';


export const onChartUpdated: ChartUpdatedHandler = (e) => {
  handlePxSeries(e);
  handleLegend(e);
  handleExtrema(e);
  handlePositionAvgPx(e);
};
