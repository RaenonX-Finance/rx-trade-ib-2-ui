import React from 'react';

import {useSignalR} from '@/contexts/signalR/hook';
import {SignalRRequests} from '@/enums/signalRRequests';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {usePxSelector} from '@/state/px/selector';
import {useDispatch} from '@/state/store';
import {OptionPxResponse} from '@/types/api/option';
import {OptionPxSubscribeRequest} from '@/types/api/px';
import {OptionDefinition} from '@/types/data/option';
import {getMidPx} from '@/utils/calc/tick';
import {getErrorMessage} from '@/utils/error';
import {Nullable} from '@/utils/type';


type UseOptionPxSubscriberOpts<TRequestFixed extends Partial<OptionPxSubscribeRequest>> = {
  definition: Nullable<OptionDefinition>,
  requestFixed: TRequestFixed,
  getRequest: (requestFixed: TRequestFixed, priceBase: number | null) => Nullable<OptionPxSubscribeRequest>,
  getDependencies: (requestFixed: TRequestFixed) => React.DependencyList,
  onRequestedPx: (response: OptionPxResponse) => void,
};

export const useOptionPxSubscriber = <TRequestFixed extends Partial<OptionPxSubscribeRequest>>({
  definition,
  requestFixed,
  getRequest,
  getDependencies,
  onRequestedPx,
}: UseOptionPxSubscriberOpts<TRequestFixed>) => {
  const {connection} = useSignalR();
  const px = usePxSelector(definition?.underlyingContractId);

  const dispatch = useDispatch();

  React.useEffect(
    () => {
      if (!connection) {
        throw new Error('SignalR connection not initialized');
      }

      const priceBase = getMidPx(px);
      const request = getRequest(requestFixed, priceBase);

      if (!px || !priceBase || !definition || !request) {
        return;
      }

      connection
        .invoke(SignalRRequests.REQUEST_PX_OPTIONS, request)
        .then((message: OptionPxResponse) => onRequestedPx(message))
        .catch((err) => {
          dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
            message: `Request option chain: ${getErrorMessage({err})}`,
          }));
        });
    },
    // `account` is only used for fetching price data,
    // therefore account change shouldn't cause immediate option Px re-fetch
    // `px` will keep changing, therefore only check if `px` is available
    // to determine if option Px should get requested
    // `request` could keep changing, so only trigger option Px re-fetch right after `request` becomes available
    [connection, definition, !!px, ...getDependencies(requestFixed)],
  );
};
