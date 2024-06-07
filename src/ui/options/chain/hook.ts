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
import {OptionChainPxSubscribeRequestState} from '@/ui/options/chain/type';
import {getStrikeRangeToRequest} from '@/ui/options/chain/utils';
import {getMidPx} from '@/utils/calc/tick';
import {getErrorMessage} from '@/utils/error';
import {Nullable} from '@/utils/type';


type SendOptionPxRequestOpts = {
  connection: HubConnection,
  pxRequest: OptionChainPxSubscribeRequestState,
  px: Nullable<PxOfContract>,
  definition: Nullable<OptionDefinition>,
  onRequestedPx: (response: OptionPxResponse) => void,
};

export const useOptionChainPxSubscriber = ({
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
        origin: 'OptionChain',
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
        .invoke(SignalRRequests.REQUEST_PX_OPTIONS, request)
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
