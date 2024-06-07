'use client';
import React from 'react';

import {SignalRConnection} from '@/contexts/signalR/type';


export const SignalRContext = React.createContext<SignalRConnection | null>(null);
