import React from 'react';

import {useSignalR} from '@/contexts/signalR/hook';
import {SignalRRequests} from '@/enums/signalRRequests';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {usePxSelector} from '@/state/px/selector';
import {useDispatch} from '@/state/store';
import {OptionPxResponse} from '@/types/api/option';
import {OptionPxSubscribeRequest} from '@/types/api/px';
import {UseOptionPxSubscriberCommonOpts} from '@/ui/options/common/hook/type';
import {getMidPx} from '@/utils/calc/tick';
import {getErrorMessage} from '@/utils/error';
import {Nullable} from '@/utils/type';


type UseOptionPxSubscriberOpts<TPayload> = UseOptionPxSubscriberCommonOpts & {
  getRequests: (payload: TPayload, priceBase: number | null) => Nullable<OptionPxSubscribeRequest[]>,
};

export const useOptionPxSubscriber = <TPayload>({
  definition,
  onRequestedPx,
  getRequests,
}: UseOptionPxSubscriberOpts<TPayload>) => {
  const {connection} = useSignalR();
  const px = usePxSelector(definition?.underlyingContractId);

  const dispatch = useDispatch();

  return React.useCallback(
    (payload: TPayload) => {
      const priceBase = getMidPx(px);
      const requests = getRequests(payload, priceBase);

      if (!px || !priceBase || !definition || !requests?.length) {
        return;
      }

      for (const request of requests) {
        connection
          .invoke(SignalRRequests.REQUEST_PX_OPTIONS, request)
          .then((message: OptionPxResponse) => onRequestedPx(message))
          .catch((err) => {
            dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
              message: `Request option chain: ${getErrorMessage({err})}`,
            }));
          });
      }
    },
    [px, definition, getRequests, onRequestedPx],
  );
};
