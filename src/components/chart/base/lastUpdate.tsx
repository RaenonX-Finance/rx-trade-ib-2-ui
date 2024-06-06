import React from 'react';

import {RssIcon} from '@heroicons/react/20/solid';

import {TimeAgo} from '@/components/timeAgo/main';
import {useAnimation} from '@/hooks/animation';
import {formatTotalSecs} from '@/utils/time';

import styles from './main.module.css';


type Props = {
  lastUpdate: number | undefined,
};

export const ChartLastUpdateComplete = ({lastUpdate}: Props) => {
  const updateIndicatorRef = useAnimation({deps: [lastUpdate], minReplayMs: 100});

  return (
    <TimeAgo
      ref={updateIndicatorRef}
      epochMs={lastUpdate}
      format={(secDiffMs) => (
        <>
          <RssIcon className="mr-1 inline size-2.5 text-gray-200"/>{formatTotalSecs(secDiffMs)}
        </>
      )}
      updateMs={100}
      className={`${styles['update-animation']} px-2 py-0 text-xs`}
    />
  );
};

export const ChartLastUpdateSimplified = ({lastUpdate}: Props) => {
  const updateIndicatorRef = useAnimation({deps: [lastUpdate], minReplayMs: 100});

  return (
    <span
      ref={updateIndicatorRef}
      className={`${styles['update-animation']} block rounded-full p-1`}
    />
  );
};
