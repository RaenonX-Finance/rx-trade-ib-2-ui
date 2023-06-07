import React from 'react';

import {XMarkIcon} from '@heroicons/react/20/solid';
import format from 'date-fns/format';
import TimeAgo from 'react-timeago';

import {errorDispatchers} from '@/state/error/dispatchers';
import {useErrorSelector} from '@/state/error/selector';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {classNames} from '@/utils/react';


export const Notification = () => {
  // Only show errors for now
  const {timestamp, message, show} = useErrorSelector();
  const dispatch = useDispatch();

  if (!show) {
    return <></>;
  }

  return (
    <div className={classNames(
      'absolute bottom-2 right-2 flex flex-row items-center rounded-lg z-30',
      'bg-gradient-to-br from-red-900 to-red-800 text-red-50',
    )}>
      <div className="flex flex-col gap-0.5 p-1.5">
        <div className="text-xs">
          {
            timestamp &&
            <>{format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss')}&nbsp;-&nbsp;<TimeAgo date={timestamp}/></>
          }
        </div>
        <div className="text-sm">
          {message}
        </div>
      </div>
      <div>
        <button
          title="Close"
          className={classNames(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg',
            'hover:ring-red-400 hover:ring-2 hover:ring-inset',
          )}
          onClick={() => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]())}
        >
          <XMarkIcon className="h-6 w-6"/>
        </button>
      </div>
    </div>
  );
};
