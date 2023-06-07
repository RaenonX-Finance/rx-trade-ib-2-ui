import {ErrorMessage} from '@/types/error';


export const ERROR_STATE_NAME = 'Error';

export enum ErrorDispatcherName {
  UPDATE = 'Error/UpdateErrorMessage',
  HIDE_ERROR = 'Error/HideError',
}

export type ErrorState = ErrorMessage & {
  show: boolean,
  timestamp: number | null, // Epoch milliseconds
};

export type ErrorSelectorReturn = ErrorState;
