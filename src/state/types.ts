import {rootReducer} from '@/state/reducer';
import {store} from '@/state/store';


export type ReduxState = ReturnType<typeof rootReducer>;

export type ReduxStore = typeof store;

export type Dispatcher = typeof store.dispatch;
