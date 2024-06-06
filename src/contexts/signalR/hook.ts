import React from 'react';

import {HubConnection} from '@microsoft/signalr';

import {SignalRContext} from '@/contexts/signalR/context';


export const useSignalR = (): HubConnection => {
  const data = React.useContext(SignalRContext);

  if (!data) {
    throw new Error('Data unavailable, make sure `<SignalRProvider/>` is called before calling `useSignalR()`');
  }

  return data;
};
