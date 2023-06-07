import React from 'react';


export type TimeAgoProps = {
  epochMs: number | undefined | null,
  format: (secDiffMs: number) => React.ReactNode,
  updateMs: number,
  className?: string,
  onClick?: () => void,
};
