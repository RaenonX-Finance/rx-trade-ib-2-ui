import React from 'react';


import {SignalRContext} from '@/contexts/signalR/context';
import {SignalRConnection} from '@/contexts/signalR/type';


export const useSignalR = (): SignalRConnection => {
  const data = React.useContext(SignalRContext);

  if (!data) {
    throw new Error('Data unavailable, make sure `<SignalRProvider/>` is called before calling `useSignalR()`');
  }

  return data;
};
