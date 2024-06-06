import React from 'react';

import {Metadata} from 'next';
// eslint-disable-next-line camelcase
import {Nunito_Sans} from 'next/font/google';

import './globals.css';
import {ReduxProvider} from '@/state/provider';


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
      <body className={`${font.className} size-full`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
