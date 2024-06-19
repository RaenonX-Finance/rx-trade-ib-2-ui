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
import {OptionDefinitionRequest, OptionPxResponse} from '@/types/api/option';
import {OptionPxRequest} from '@/types/api/px';
import {optionPxSignalREventName} from '@/ui/options/common/hook/const';
import {UseOptionPxManagerCommonOpts} from '@/ui/options/common/hook/type';
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
    inUsePxRequestIds: [],
  });

  const [progress, setProgress] = React.useState<ProgressComboData | null>(null);

  const requestOptionDefinitions = React.useCallback(() => {
    dispatch(clearAction());
    connection
      .send(SignalRRequests.REQUEST_OPTION_DEFINITIONS, definitionRequest)
      .catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Error while sending option definition request: ${getErrorMessage({err})}`,
      })));
    setDefinitionRequest((original) => ({
      ...original,
      inUsePxRequestIds: [],
    }));
  }, [definitionRequest]);

  const subscribeOptionPx = React.useCallback(async (payload: TPayload) => {
    dispatch(optionDispatchers[OptionDispatcherName.RESET_CONTRACTS](origin));
    const priceBase = getReferencePx(px);
    const requests = getRequests(payload, priceBase);

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
        const {realtimeRequestIds} = response;

        dispatch(optionDispatchers[OptionDispatcherName.UPDATE_CONTRACTS](response));
        setDefinitionRequest((original): OptionDefinitionRequest => ({
          ...original,
          // `SignalRRequests.REQUEST_PX_OPTIONS` is invoked multiple times,
          // therefore concatenating `inUsePxRequestIds` instead of overwriting
          inUsePxRequestIds: [...original.inUsePxRequestIds, ...realtimeRequestIds],
        }));
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
