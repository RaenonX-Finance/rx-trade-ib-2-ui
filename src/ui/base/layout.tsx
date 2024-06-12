import React from 'react';

import {SignalRConnectionPopup} from '@/components/popup/signalR/main';
import {NavBar} from '@/ui/base/navbar/main';
import {Notification} from '@/ui/base/notification';


export const PageLayout = ({children}: React.PropsWithChildren) => {
  return (
    <main className="gap-common flex w-full flex-col p-2">
      <NavBar/>
      {children}
      <SignalRConnectionPopup/>
      <Notification/>
    </main>
  );
};
