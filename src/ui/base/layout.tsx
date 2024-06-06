'use client';
import React from 'react';

import {ConnectionPopup} from '@/ui/base/connectionPopup';
import {NavBar} from '@/ui/base/navbar/main';
import {Notification} from '@/ui/base/notification';


export const PageLayout = ({children}: React.PropsWithChildren) => {
  return (
    <main className="flex size-full flex-col gap-1.5 bg-gradient-radial from-slate-800 to-slate-950 p-2">
      <NavBar/>
      {children}
      <ConnectionPopup/>
      <Notification/>
    </main>
  );
};
