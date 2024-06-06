'use client';
import React from 'react';

import {useSignalRConnection} from '@/contexts/signalR/connection/main';
import {SignalRContext} from '@/contexts/signalR/context';
import {SignalRRequests} from '@/enums/signalRRequests';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {getErrorMessage} from '@/utils/error';


export const SignalRProvider = ({children}: React.PropsWithChildren) => {
  const dispatch = useDispatch();

  const connection = useSignalRConnection({
    onConnected: ({current}) => {
      current
        .send(SignalRRequests.INIT_ACCOUNT_LIST)
        .catch((err) => {
          dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
            message: `Init account list: ${getErrorMessage({err})}`,
          }));
        });
    },
  });

  return (
    <SignalRContext.Provider value={{connection, state: connection.state}}>
      {children}
    </SignalRContext.Provider>
  );
};
