import React from 'react';

import {HubConnectionState} from '@microsoft/signalr';

import {LoadingPane} from '@/components/icons/loading/pane';
import {useSignalR} from '@/contexts/signalR/hook';


export const SignalRConnectionPopupContent = () => {
  const {state} = useSignalR();

  if (state === HubConnectionState.Connected) {
    return null;
  }

  if (state === HubConnectionState.Connecting) {
    return <LoadingPane text="Connecting to the server"/>;
  }

  if (state === HubConnectionState.Disconnected) {
    return (
      <div className="rounded-md bg-gradient-to-br from-red-950 to-red-800 p-2 text-red-50">
        Server disconnected
      </div>
    );
  }

  if (state === HubConnectionState.Disconnecting) {
    return <LoadingPane text="Disconnecting from the server"/>;
  }

  if (state === HubConnectionState.Reconnecting) {
    return <LoadingPane text="Reconnecting to the server"/>;
  }

  throw new Error(`Unhandled signalR connection state: ${state satisfies never}`);
};
