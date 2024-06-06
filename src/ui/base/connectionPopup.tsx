import React from 'react';

import {HubConnectionState} from '@microsoft/signalr';

import {LoadingPane} from '@/components/icons/loading/pane';
import {Popup} from '@/components/popup';
import {useSignalR} from '@/contexts/signalR/hook';


export const ConnectionPopup = () => {
  const {state} = useSignalR();

  if (state === HubConnectionState.Connected) {
    return null;
  }

  if (state === HubConnectionState.Connecting) {
    return (
      <Popup>
        <LoadingPane text="Connecting to the server"/>
      </Popup>
    );
  }

  if (state === HubConnectionState.Disconnected) {
    return (
      <Popup>
        <div className="rounded-md bg-gradient-to-br from-red-950 to-red-800 p-2 text-red-50">
          Server disconnected
        </div>
      </Popup>
    );
  }

  if (state === HubConnectionState.Disconnecting) {
    return (
      <Popup>
        <LoadingPane text="Disconnecting from the server"/>
      </Popup>
    );
  }

  if (state === HubConnectionState.Reconnecting) {
    return (
      <Popup>
        <LoadingPane text="Reconnecting to the server"/>
      </Popup>
    );
  }

  throw new Error(`Unhandled signalR connection state: ${state}`);
};
