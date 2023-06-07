import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {ChartData, ChartDataIdentifier} from '@/types/data/chart';


export const useChartDataSelector = (identifier: ChartDataIdentifier | undefined): ChartData | undefined => (
  useSelector(
    ({chartPx}: ReduxState) => !!identifier ? chartPx.data[identifier] : undefined,
    // What should trigger the update is whether the close / timestamp of the last bar changed
    (prev, curr) => {
      const prevLast = prev?.bars.at(-1);
      const currLast = curr?.bars.at(-1);

      return prevLast?.close === currLast?.close && prevLast?.epochSec === currLast?.epochSec;
    },
  )
);
