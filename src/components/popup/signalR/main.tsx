'use client';
import React from 'react';

import {HubConnectionState} from '@microsoft/signalr';

import {Popup} from '@/components/popup';
import {SignalRConnectionPopupContent} from '@/components/popup/signalR/content';
import {useSignalR} from '@/contexts/signalR/hook';


export const SignalRConnectionPopup = () => {
  const {state} = useSignalR();

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(state !== HubConnectionState.Connected);
  }, [state]);

  return (
    <Popup show={show} setShow={setShow}>
      <SignalRConnectionPopupContent/>
    </Popup>
  );
};
