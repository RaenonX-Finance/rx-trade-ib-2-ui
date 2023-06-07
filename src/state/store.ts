import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useReduxDispatch} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';

import {rootReducer} from '@/state/reducer';
import {Dispatcher} from '@/state/types';


const persistedReducer = persistReducer(
  {
    key: `redux-${process.env.NODE_ENV}`,
    version: 1,
    storage,
    whitelist: ['chartConfig'],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // `signalRConnection` needed in payload to send necessary request when processing redux actions
        // Such connection should NOT be stored in the states
        ignoredActionPaths: ['meta.arg.signalRConnection', 'payload.signalRConnection'],
        ignoredPaths: [/signalRConnection/g],
      },
    })
  ),
});

export const persistedStore = persistStore(store);

export const useDispatch = (): Dispatcher => useReduxDispatch<Dispatcher>();
