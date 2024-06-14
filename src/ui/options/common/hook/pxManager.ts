import React from 'react';

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
import {UseOptionPxManagerCommonOpts} from '@/ui/options/common/hook/type';
import {getMidPx} from '@/utils/calc/tick';
import {getErrorMessage} from '@/utils/error';
import {Nullable} from '@/utils/type';


type UseOptionPxSubscriberOpts<TPayload> = UseOptionPxManagerCommonOpts & {
  getRequests: (payload: TPayload, priceBase: number | null) => Nullable<OptionPxRequest[]>,
};

export const useOptionPxManager = <TPayload>({
  origin,
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

  const subscribeOptionPx = React.useCallback(
    (payload: TPayload) => {
      const priceBase = getMidPx(px);
      const requests = getRequests(payload, priceBase);

      if (!px || !priceBase || !definition || !requests?.length) {
        return;
      }

      for (const request of requests) {
        connection
          .invoke(SignalRRequests.SUBSCRIBE_PX_OPTIONS, request)
          .then((response: OptionPxResponse) => {
            const {realtimeRequestIds} = response;

            dispatch(optionDispatchers[OptionDispatcherName.UPDATE_CONTRACTS](response));
            setDefinitionRequest((original): OptionDefinitionRequest => ({
              ...original,
              // `SignalRRequests.REQUEST_PX_OPTIONS` is invoked multiple times,
              // therefore concatenating `inUsePxRequestIds` instead of overwriting
              inUsePxRequestIds: [...original.inUsePxRequestIds, ...realtimeRequestIds],
            }));
          })
          .catch((err) => {
            dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
              message: `Error while requesting option px: ${getErrorMessage({err})}`,
            }));
          });
      }
    },
    [px, definition, getRequests, setDefinitionRequest],
  );

  return {
    definitionRequest,
    setDefinitionRequest,
    requestOptionDefinitions,
    subscribeOptionPx,
  };
};
