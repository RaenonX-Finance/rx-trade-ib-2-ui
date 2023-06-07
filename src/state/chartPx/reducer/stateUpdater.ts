import {applyTimezoneOffsetOnBars} from '@/state/chartPx/reducer/timezoneOffset';
import {ChartUpdatePayload} from '@/state/chartPx/reducer/type';
import {ChartDataState} from '@/state/chartPx/types';
import {PxHistoryMessage} from '@/types/api/px';


export type StateUpdateFuncOpts<T extends PxHistoryMessage> = {
  state: ChartDataState,
  payload: ChartUpdatePayload<T>,
};

export type ChartStateUpdaterOpts<T extends PxHistoryMessage> = {
  state: ChartDataState,
  payload: StateUpdateFuncOpts<T>['payload'][],
  fnUpdateState: (opts: StateUpdateFuncOpts<T>) => void,
};

export const chartStateUpdater = <T extends PxHistoryMessage>({
  state,
  payload,
  fnUpdateState,
}: ChartStateUpdaterOpts<T>) => {
  payload.map(applyTimezoneOffsetOnBars).forEach((singlePayload) => {
    fnUpdateState({
      state,
      payload: singlePayload,
    });
  });
};
