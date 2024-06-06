import React from 'react';

import {XMarkIcon} from '@heroicons/react/20/solid';
import {clsx} from 'clsx';
import {format} from 'date-fns/format';

import {GlobalTimeAgo} from '@/components/timeAgo/global';
import {errorDispatchers} from '@/state/error/dispatchers';
import {useErrorSelector} from '@/state/error/selector';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';


export const Notification = () => {
  // Only show errors for now
  const {timestamp, message, show} = useErrorSelector();
  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  return (
    <div className={clsx(
      'absolute bottom-2 right-2 z-30 flex flex-row items-center rounded-lg',
      'bg-gradient-to-br from-red-900 to-red-800 text-red-50',
    )}>
      <div className="flex flex-col gap-0.5 p-1.5">
        <div className="text-xs">
          {
            timestamp &&
            <>{format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss')}&nbsp;-&nbsp;<GlobalTimeAgo date={timestamp}/></>
          }
        </div>
        <div className="text-sm">
          {message}
        </div>
      </div>
      <div>
        <button
          title="Close"
          className={clsx(
            'inline-flex size-10 items-center justify-center rounded-lg',
            'hover:ring-2 hover:ring-inset hover:ring-red-400',
          )}
          onClick={() => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]())}
        >
          <XMarkIcon className="size-6"/>
        </button>
      </div>
    </div>
  );
};
