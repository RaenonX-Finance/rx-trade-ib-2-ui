import {toLegendDataFromBar} from '@/components/chart/convert/legend';
import {getTypeOfActiveSeries} from '@/components/chart/plot/utils';
import {ChartInitPayload} from '@/components/chart/type';
import {getDigitsFromMinTick} from '@/utils/chart';


export const handleLegend = (e: ChartInitPayload) => {
  const {chartDataRef, setAddon, contract} = e;
  const seriesType = getTypeOfActiveSeries(e);

  setAddon.legend((original) => toLegendDataFromBar({
    original,
    bar: chartDataRef.current.bars.at(-1),
    seriesType,
    digits: getDigitsFromMinTick(contract.details?.minTick ?? 0.01),
    hovered: false,
  }));
};
