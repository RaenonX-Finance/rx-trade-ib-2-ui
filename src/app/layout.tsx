import React from 'react';

import {clsx} from 'clsx';
import {Metadata} from 'next';
// eslint-disable-next-line camelcase
import {Nunito_Sans} from 'next/font/google';

import {SignalRProvider} from '@/contexts/signalR/provider';
import {ReduxProvider} from '@/state/provider';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import './globals.css';


// eslint-disable-next-line new-cap
const font = Nunito_Sans({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Positions & Orders',
};

const RootLayout = ({children}: React.PropsWithChildren) => {
  return (
    <html lang="en" className="h-full">
      <body className={clsx('size-full', font.className)}>
        <ReduxProvider>
          <SignalRProvider>
            {children}
          </SignalRProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
