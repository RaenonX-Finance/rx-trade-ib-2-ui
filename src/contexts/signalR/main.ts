import React from 'react';

import {HubConnection} from '@microsoft/signalr';


export const SignalRContext = React.createContext<HubConnection | null>(null);
