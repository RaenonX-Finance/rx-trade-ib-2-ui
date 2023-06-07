import {ChartDataBar} from '@/types/api/chart';
import {mergeThenSort} from '@/utils/array';


type MergeChartDataOptions = {
  newBars: ChartDataBar[],
  original: ChartDataBar[] | undefined,
  lastInState: ChartDataBar,
};

export const mergeBars = ({newBars, original, lastInState}: MergeChartDataOptions): ChartDataBar[] => {
  let data = mergeThenSort(
    original || [],
    newBars,
    ({epochSec}) => epochSec,
  );

  const lastBarOfMerged = data.at(-1);

  // Only merge last if new history data (`newBars`) doesn't get a new bar
  // - `original` and `newBars` are sorted by epoch sec ASC already
  if (original && lastBarOfMerged && original.at(-1)?.epochSec === newBars.at(-1)?.epochSec) {
    // `newBars` originates from history data.
    // The last close of history data is delayed from the current price,
    // because `KL.PxParse` batches history data update for storing into DB.
    // Therefore,
    // - The last bar is the last of H/L of the merged (data from history) and the data in state (data from realtime)
    // - Close takes in-state (data from realtime), because Realtime data is the latest data
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
