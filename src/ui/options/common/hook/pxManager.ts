import React from 'react';

import {ProgressComboData} from '@/components/progress/combo/type';
import {useSignalR} from '@/contexts/signalR/hook';
import {SignalRRequests} from '@/enums/signalRRequests';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {optionDispatchers} from '@/state/option/dispatchers';
import {OptionDispatcherName} from '@/state/option/types';
import {usePxSelector} from '@/state/px/selector';
import {useDispatch} from '@/state/store';
import {CancelRealtimeRequest} from '@/types/api/cleanup';
import {OptionDefinitionRequest, OptionPxResponse} from '@/types/api/option';
import {OptionPxRequest} from '@/types/api/px';
import {optionPxSignalREventName} from '@/ui/options/common/hook/const';
import {SubscribeOptionPxRequestOpts, UseOptionPxManagerCommonOpts} from '@/ui/options/common/hook/type';
import {getReferencePx} from '@/utils/calc/tick';
import {getErrorMessage} from '@/utils/error';
import {Nullable} from '@/utils/type';


type UseOptionPxSubscriberOpts<TPayload> = UseOptionPxManagerCommonOpts & {
  getRequests: (payload: TPayload, priceBase: number | null) => Nullable<OptionPxRequest[]>,
};

export const useOptionPxManager = <TPayload>({
  origin,
  type,
  definition,
  clearAction,
  getRequests,
}: UseOptionPxSubscriberOpts<TPayload>) => {
  const {connection} = useSignalR();
  const px = usePxSelector(definition?.underlyingContractId);

  const dispatch = useDispatch();

  const [definitionRequest, setDefinitionRequest] = React.useState<OptionDefinitionRequest>({
    origin,
    account: '',
    symbol: '',
    inUseContractId: null,
  });

  const [progress, setProgress] = React.useState<ProgressComboData | null>(null);

  const cancelRealtimeRequests = React.useCallback(async (realtimeRequestIdsToCancel: Nullable<number[]>) => {
    if (!realtimeRequestIdsToCancel?.length) {
      return;
    }

    await connection.invoke(
      SignalRRequests.CANCEL_PX_REALTIME,
      {requestIds: realtimeRequestIdsToCancel} satisfies CancelRealtimeRequest,
    );
    dispatch(optionDispatchers[OptionDispatcherName.RESET_REALTIME_REQUESTS](origin));
  }, []);

  const requestOptionDefinitions = React.useCallback(async (realtimeRequestIdsToCancel: number[]) => {
    await cancelRealtimeRequests(realtimeRequestIdsToCancel);
    dispatch(clearAction());
    connection
      .send(SignalRRequests.REQUEST_OPTION_DEFINITIONS, definitionRequest)
      .catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Error while sending option definition request: ${getErrorMessage({err})}`,
      })));
  }, [definitionRequest]);

  const subscribeOptionPx = React.useCallback(async ({
    payload,
    realtimeRequestIdsToCancel,
  }: SubscribeOptionPxRequestOpts<TPayload>) => {
    dispatch(optionDispatchers[OptionDispatcherName.RESET_CONTRACTS](origin));
    const priceBase = getReferencePx(px);
    const requests = getRequests(payload, priceBase);

    await cancelRealtimeRequests(realtimeRequestIdsToCancel);

    if (!px || !priceBase || !definition || !requests?.length) {
      return;
    }

    setProgress({
      completed: 0,
      total: requests.length,
    });
    for (let idx = 0; idx < requests.length; idx++) {
      const request = requests[idx];

      try {
        const response = await connection.invoke<OptionPxResponse>(optionPxSignalREventName[type], request);

        dispatch(optionDispatchers[OptionDispatcherName.UPDATE_CONTRACTS](response));
      } catch (err) {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Error while requesting option px: ${getErrorMessage({err})}`,
        }));
      }
      setProgress({
        completed: idx + 1,
        total: requests.length,
      });
    }
  }, [px, definition, getRequests, setDefinitionRequest]);

  return {
    definitionRequest,
    setDefinitionRequest,
    requestOptionDefinitions,
    subscribeOptionPx,
    progress,
  };
};
