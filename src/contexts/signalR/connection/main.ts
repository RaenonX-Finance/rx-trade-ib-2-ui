import React from 'react';

import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import {useBeforeunload} from 'react-beforeunload';

import {SignalRHandlers} from '@/contexts/signalR/connection/const';
import {SignalRRequests} from '@/enums/signalRRequests';
import {useAntiSleeper} from '@/hooks/antiSleeper';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {getErrorMessage} from '@/utils/error';
import {Nullable} from '@/utils/type';


type UseSignalRConnectionOpts = {
  onConnected: (connectionRef: React.MutableRefObject<HubConnection>) => void,
};

export const useSignalRConnection = ({onConnected}: UseSignalRConnectionOpts): HubConnection => {
  const connectionRef = React.useRef(
    new HubConnectionBuilder()
      .withUrl('http://localhost:5075/signalr')
      .withAutomaticReconnect()
      .build(),
  );

  useAntiSleeper();

  const dispatch = useDispatch();
  const currentAccount = useCurrentAccountSelector();

  const disconnectAccount = React.useCallback((currentAccount: Nullable<string>) => {
    if (!currentAccount) {
      console.warn('Current account ID is undefined. Nothing to disconnect.');
      return;
    }

    connectionRef.current
      .send(SignalRRequests.DISCONNECT_ACCOUNT, currentAccount)
      .catch((err) => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Account disconnect: ${getErrorMessage({err})}`,
        }));
      });
  }, []);

  // Window is loaded
  // - Load all signalR event handlers
  // - Load reconnection event handlers
  React.useEffect(() => {
    const onWindowLoaded = () => {
      // --- Connection event handlers
      connectionRef.current.onreconnected(() => onConnected(connectionRef));

      // --- Event Handlers
      Object.entries(SignalRHandlers).map(([signalREvent, actionsGenerator]) => {
        connectionRef.current.on(
          signalREvent,
          (message) => {
            actionsGenerator(message, connectionRef.current)
              .forEach((action) => dispatch(action));
          },
        );
      });

      // --- Start
      // Only starts the connection if it's disconnected, otherwise, the error below will trigger
      // `Error on signalR start: Cannot start a HubConnection that is not in the 'Disconnected' state.`
      if (connectionRef.current.state !== HubConnectionState.Disconnected) {
        return;
      }

      connectionRef.current
        .start()
        .then(() => onConnected(connectionRef))
        .catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Error on signalR start: ${getErrorMessage({err})}`,
        })));
    };

    window.addEventListener('load', onWindowLoaded);

    return () => window.removeEventListener('load', onWindowLoaded);
  }, []);

  // Window will be unloaded
  // - Remove signalR event listeners
  // - Disconnect signalR
  useBeforeunload(() => {
    Object.keys(SignalRHandlers).forEach((signalREvent) => connectionRef.current.off(signalREvent));
    disconnectAccount(currentAccount);

    connectionRef.current.stop().catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
      message: `Error on signalR stop: ${getErrorMessage({err})}`,
    })));
  });

  // On account changed
  // - Init account data
  React.useEffect(() => {
    if (!currentAccount) {
      return;
    }

    connectionRef.current
      .send(SignalRRequests.INIT_ACCOUNT, currentAccount)
      .catch((err) => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Init account: ${getErrorMessage({err})}`,
        }));
      });

    return () => disconnectAccount(currentAccount);
  }, [currentAccount]);

  return connectionRef.current;
};
