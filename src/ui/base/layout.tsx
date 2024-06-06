'use client';
import React from 'react';

import {HubConnection} from '@microsoft/signalr';

import {SignalRContext} from '@/contexts/signalR/main';
import {SignalRRequests} from '@/enums/signalRRequests';
import {useOnBeforeUnload} from '@/hooks/onBeforeUnload';
import {useSignalRConnection} from '@/hooks/signalRConnection/main';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {ConnectionPopup} from '@/ui/base/connectionPopup';
import {NavBar} from '@/ui/base/navbar/main';
import {Notification} from '@/ui/base/notification';
import {getErrorMessage} from '@/utils/error';


export const PageLayout = ({children}: React.PropsWithChildren<{}>) => {
  const dispatch = useDispatch();
  const currentAccount = useCurrentAccountSelector();

  const onAccountSwitched = React.useCallback((hubConnection: HubConnection) => {
    if (!currentAccount) {
      console.warn('Current account ID is undefined.');
      return;
    }

    hubConnection
      .send(SignalRRequests.DISCONNECT_ACCOUNT, currentAccount)
      .catch((err) => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Account disconnect: ${getErrorMessage({err})}`,
        }));
      });
  }, [currentAccount]);
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

  useOnBeforeUnload({
    onBeforeUnload: () => onAccountSwitched(connection),
    deps: [currentAccount],
  });

  React.useEffect(() => {
    if (!currentAccount) {
      return;
    }

    connection
      .send(SignalRRequests.INIT_ACCOUNT, currentAccount)
      .catch((err) => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Init account: ${getErrorMessage({err})}`,
        }));
      });

    return () => {
      onAccountSwitched(connection);
    };
  }, [currentAccount]);

  return (
    <SignalRContext.Provider value={connection}>
      <main className="flex size-full flex-col gap-1.5 bg-gradient-radial from-slate-800 to-slate-950 p-2">
        <NavBar/>
        {children}
        <ConnectionPopup state={connection.state}/>
        <Notification/>
      </main>
    </SignalRContext.Provider>
  );
};
