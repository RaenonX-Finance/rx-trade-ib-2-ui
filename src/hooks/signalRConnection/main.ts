import React from 'react';

import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';

import {SignalRHandlers} from '@/hooks/signalRConnection/const';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {getErrorMessage} from '@/utils/error';


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

  const dispatch = useDispatch();

  useAntiSleeper();

  React.useEffect(() => {
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
    if (connectionRef.current.state === HubConnectionState.Disconnected) {
      // Only starts the connection if it's disconnected, otherwise, the error below will trigger
      // `Error on signalR start: Cannot start a HubConnection that is not in the 'Disconnected' state.`
      connectionRef.current
        .start()
        .then(() => onConnected(connectionRef))
        .catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Error on signalR start: ${getErrorMessage({err})}`,
        })));
    }

    return () => {
      Object.keys(SignalRHandlers).forEach((signalREvent) => connectionRef.current.off(signalREvent));

      connectionRef.current.stop().catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Error on signalR stop: ${getErrorMessage({err})}`,
      })));
    };
  }, []);

  return connectionRef.current;
};
