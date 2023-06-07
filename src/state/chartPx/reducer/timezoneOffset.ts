import {StateUpdateFuncOpts} from '@/state/chartPx/reducer/stateUpdater';
import {PxHistoryMessage} from '@/types/api/px';
import {updateEpochSecToLocal} from '@/utils/time';


export const applyTimezoneOffsetOnBars = <T extends PxHistoryMessage>(
  payload: StateUpdateFuncOpts<T>['payload'],
): StateUpdateFuncOpts<T>['payload'] => {
  if (!payload.data) {
    return {
      ...payload,
      data: null,
    };
  }

  return {
    ...payload,
    data: {
      ...payload.data,
      bars: payload.data.bars.map((item) => ({
        ...item,
        epochSec: updateEpochSecToLocal(item.epochSec),
      })),
    },
  };
};
