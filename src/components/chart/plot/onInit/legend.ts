import {toLegendDataFromBar} from '@/components/chart/convert/legend';
import {getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {ChartInitPayload} from '@/components/chart/type';


export const handleLegend = (e: ChartInitPayload) => {
  const {chartDataRef, setAddon, contract} = e;
  const seriesType = getTypeOfActiveSeries(e);

  setAddon.legend((original) => toLegendDataFromBar({
    original,
    bar: chartDataRef.current.bars.at(-1),
    seriesType,
    digits: contract.digits,
    hovered: false,
  }));
};
