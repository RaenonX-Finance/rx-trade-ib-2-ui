'use client';
import React from 'react';

import {HubConnectionState} from '@microsoft/signalr';

import {Popup} from '@/components/popup';
import {SignalRConnectionPopupContent} from '@/components/popup/signalR/content';
import {useSignalR} from '@/contexts/signalR/hook';


export const SignalRConnectionPopup = () => {
  const {state} = useSignalR();

  if (state === HubConnectionState.Connected) {
    return null;
  }

  return (
    <Popup>
      <SignalRConnectionPopupContent/>
    </Popup>
  );
};
