import {StateUpdateFuncOpts} from '@/state/chartPx/reducer/stateUpdater';
import {isChartDataBarWithData} from '@/types/api/chart';
import {PxHistoryMessage} from '@/types/api/px';


export const chartStateUpdaterOnInit = <T extends PxHistoryMessage>({
  state,
  payload,
}: StateUpdateFuncOpts<T>) => {
  const {data, identifier} = payload;

  if (data === null) {
    state.data[identifier] = undefined;
    return;
  }

  state.data[identifier] = {
    bars: data.bars.filter(isChartDataBarWithData),
    contractId: data.meta.contractId,
    dataType: data.meta.dataType,
  };
};
