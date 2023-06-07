import {Dispatch} from '@reduxjs/toolkit';

import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';


type OnAsyncThunkErrorOpts<T, R> = {
  message: string;
  data: T;
  rejectWithValue: (value: string) => R;
  dispatch: Dispatch;
};

export const onAsyncThunkError = <T, R>({
  message,
  data,
  rejectWithValue,
  dispatch,
}: OnAsyncThunkErrorOpts<T, R>) => {
  console.error(message, JSON.stringify(data));
  dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
  return rejectWithValue(message);
};
