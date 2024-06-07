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
import {getStrikeRangeToRequest} from '@/ui/options/chain/utils';
import {getMidPx} from '@/utils/calc/tick';
import {getErrorMessage} from '@/utils/error';


type SendOptionPxRequestOpts = {
  connection: HubConnection | null,
  pxRequest: OptionPxSubscribeRequestState,
  px: PxOfContract | undefined,
  definition: OptionDefinition | undefined,
  onRequestedPx: (response: OptionPxResponse) => void,
};

export const useSendOptionPxRequest = ({
  connection,
  pxRequest,
  px,
  definition,
  onRequestedPx,
}: SendOptionPxRequestOpts) => {
  const {expiry} = pxRequest;

  const dispatch = useDispatch();

  const priceBase = getMidPx(px);

  React.useEffect(
    () => {
      if (!connection) {
        throw new Error('SignalR connection not initialized');
      }

      const {symbol, expiry, account, tradingClass} = pxRequest;

      if (!px || !priceBase || !definition || !symbol || !expiry || !account) {
        return;
      }

      const request: OptionPxSubscribeRequest = {
        symbol,
        expiry,
        account,
        tradingClass,
        strikes: getStrikeRangeToRequest({
          priceBase,
          strikeRangePercent: pxRequest.strikeRangePercent,
          possibleStrikes: definition.strike,
        }),
      };

      connection
        .invoke(SignalRRequests.REQUEST_PX_OPTION_CHAIN, request)
        .then((message: OptionPxResponse) => onRequestedPx(message))
        .catch((err) => {
          dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
            message: `Request option chain: ${getErrorMessage({err})}`,
          }));
        });
    },
    // `account` is only used for fetching price data,
    // therefore account change shouldn't cause immediate option chain re-fetch
    [connection, definition, !!priceBase, expiry],
  );
};
