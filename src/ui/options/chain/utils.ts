import React from 'react';

import {HubConnection} from '@microsoft/signalr';

import {SignalRRequests} from '@/enums/signalRRequests';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {OptionPxResponse} from '@/types/api/option';
import {OptionPxSubscribeRequest} from '@/types/api/px';
import {OptionDefinition} from '@/types/data/option';
import {PxOfContract} from '@/types/data/px';
import {OptionPxSubscribeRequestState} from '@/ui/options/chain/type';
import {getMidPx} from '@/utils/calc/px';
import {getErrorMessage} from '@/utils/error';


type SendOptionPxRequestOpts = {
  connection: HubConnection | null,
  pxRequestState: OptionPxSubscribeRequestState,
  px: PxOfContract | undefined,
  definition: OptionDefinition | undefined,
  onRequestedPx: (response: OptionPxResponse) => void,
};

export const useSendOptionPxRequest = ({
  connection,
  pxRequestState,
  px,
  definition,
  onRequestedPx,
}: SendOptionPxRequestOpts) => {
  const dispatch = useDispatch();

  const priceBase = getMidPx(px);

  return React.useCallback(() => {
    if (!connection) {
      throw new Error('SignalR connection not initialized');
    }

    const {symbol, expiry, account, tradingClass} = pxRequestState;

    if (!px || !priceBase || !definition || !symbol || !expiry || !account) {
      return;
    }

    // `definition.strike` is readonly, calling sort causes error
    const strikeRangeRate = pxRequestState.strikeRangePercent / 100;
    const strikeLowerBound = priceBase * (1 - strikeRangeRate);
    const strikeUpperBound = priceBase * (1 + strikeRangeRate);
    const request: OptionPxSubscribeRequest = {
      symbol,
      expiry,
      account,
      tradingClass,
      strikes: definition.strike.filter((singleStrike) => (
        strikeLowerBound <= singleStrike && singleStrike <= strikeUpperBound
      )),
    };

    connection
      .invoke(SignalRRequests.REQUEST_PX_OPTION_CHAIN, request)
      .then((message: OptionPxResponse) => onRequestedPx(message))
      .catch((err) => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Request option chain: ${getErrorMessage({err})}`,
        }));
      });
  }, [connection, definition, !!priceBase, pxRequestState]);
};
