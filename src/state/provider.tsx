'use client';
import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';

import {LoadingPane} from '@/components/icons/loading/pane';
import {persistedStore, store} from '@/state/store';


export const ReduxProvider = ({children}: React.PropsWithChildren) => (
  <Provider store={store}>
    <PersistGate loading={<LoadingPane text="Loading Redux..."/>} persistor={persistedStore}>
      {children}
    </PersistGate>
  </Provider>
);
