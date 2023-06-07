import React from 'react';

import {TimeAgoProps} from '@/components/timeAgo/type';


export const TimeAgo = React.forwardRef<HTMLSpanElement, TimeAgoProps>((
  {epochMs, format, updateMs, className, onClick},
  ref,
) => {
  const [secAgo, setSecAgo] = React.useState(epochMs ? (Date.now() - epochMs) / 1000 : undefined);

  React.useEffect(() => {
    if (!epochMs) {
      return;
    }

    const intervalId = setInterval(
      () => setSecAgo((Date.now() - epochMs) / 1000),
      updateMs,
    );

    return () => clearInterval(intervalId);
  }, [epochMs]);

  return (
    <span ref={ref} className={className} onClick={onClick}>
      {secAgo ? format(secAgo) : '-'}
    </span>
  );
});
TimeAgo.displayName = 'TimeAgo';
