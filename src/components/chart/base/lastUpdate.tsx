import React from 'react';

import {RssIcon} from '@heroicons/react/20/solid';

import {SecondsAgo} from '@/components/timeAgo/seconds';
import {useAnimation} from '@/hooks/animation';
import {formatTotalSecs} from '@/utils/time';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import styles from './main.module.css';


type Props = {
  lastUpdate: number | undefined,
};

export const ChartLastUpdateComplete = ({lastUpdate}: Props) => {
  const updateIndicatorRef = useAnimation({deps: [lastUpdate], minReplayMs: 100});

  return (
    <SecondsAgo
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
