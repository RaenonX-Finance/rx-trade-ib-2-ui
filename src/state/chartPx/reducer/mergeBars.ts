import {ChartDataBar, ChartDataBarWithData, isChartDataBarWithData} from '@/types/api/chart';
import {mergeThenSort} from '@/utils/array';


type MergeChartDataOptions = {
  newBars: ChartDataBar[],
  original: ChartDataBarWithData[] | undefined,
  lastInState: ChartDataBarWithData,
};

export const mergeBars = ({newBars, original, lastInState}: MergeChartDataOptions): ChartDataBarWithData[] => {
  if (!original) {
    return [];
  }

  const lastOfOriginal = original.at(-1);
  if (!lastOfOriginal) {
    return [];
  }

  let data = mergeThenSort(
    original || [],
    // Use data of the last of the original if the bar is empty
    newBars.map((bar) => !isChartDataBarWithData(bar) ? lastOfOriginal : bar),
    ({epochSec}) => epochSec,
  );

  const lastBarOfMerged = data.at(-1);

  if (lastBarOfMerged && lastOfOriginal.epochSec === newBars.at(-1)?.epochSec) {
    data = [
      ...data.slice(0, -1),
      {
        ...lastBarOfMerged,
        high: Math.max(lastBarOfMerged.high, lastInState.high),
        low: Math.min(lastBarOfMerged.low, lastInState.low),
        close: lastInState.close,
      },
    ];
  }

  return data;
};
