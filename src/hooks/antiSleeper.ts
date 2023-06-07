import React from 'react';

import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {getErrorMessage} from '@/utils/error';


export const useAntiSleeper = () => {
  const dispatch = useDispatch();

  // Utilize web lock
  React.useEffect(() => {
    if (navigator && navigator.locks && navigator.locks.request) {
      const promise = new Promise(() => void 0);

      navigator.locks.request('antiSleeper', {mode: 'shared'}, () => {
        return promise;
      }) .catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Anti-sleeper: ${getErrorMessage({err})}`,
      })));
    }
  }, []);
};
