import React from 'react';


type Props = {
  epochMs: number | undefined | null,
  format: (secDiffMs: number) => React.ReactNode,
  updateMs: number,
  className?: string,
  onClick?: () => void,
};

export const SecondsAgo = React.forwardRef<HTMLSpanElement, Props>(({
  epochMs,
  format,
  updateMs,
  className,
  onClick,
}, ref) => {
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
SecondsAgo.displayName = 'TimeAgo';
