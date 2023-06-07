import {mergeBars} from '@/state/chartPx/reducer/mergeBars';
import {StateUpdateFuncOpts} from '@/state/chartPx/reducer/stateUpdater';
import {PxHistoryMessage} from '@/types/api/px';
import {ChartData} from '@/types/data/chart';


export const chartStateUpdaterOnUpdate = <T extends PxHistoryMessage>({
  state,
  payload,
}: StateUpdateFuncOpts<T>) => {
  const {data, identifier} = payload;
  const dataInState = state.data[identifier];

  if (!data || !dataInState) {
    return state;
  }

  const lastInState = dataInState.bars.at(-1);

  if (!lastInState) {
    return;
  }

  state.data[identifier] = {
    ...dataInState,
    ...data,
    bars: mergeBars({
      newBars: data.bars,
      original: state.data[identifier]?.bars,
      lastInState,
    }),
  } satisfies ChartData;
};
