import {createAction} from '@reduxjs/toolkit';

import {ErrorDispatcherName} from '@/state/error/types';
import {ErrorMessage} from '@/types/error';


export const errorDispatchers = {
  [ErrorDispatcherName.UPDATE]: createAction<ErrorMessage>(
    ErrorDispatcherName.UPDATE,
  ),
  [ErrorDispatcherName.HIDE_ERROR]: createAction(
    ErrorDispatcherName.HIDE_ERROR,
  ),
};
