import {HubConnection} from '@microsoft/signalr';
import {AsyncThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';

import {SignalREvents} from '@/enums/signalREvents';


export type SignalRActionGenerator = (
  message: any, signalRConnection: HubConnection
) => (Action | AsyncThunkAction<any, any, any>)[];

export type SignalRHandlerMap = {[event in SignalREvents]: SignalRActionGenerator};
