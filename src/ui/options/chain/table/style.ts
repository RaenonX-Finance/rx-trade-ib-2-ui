import {clsx} from 'clsx';

import {Nullable} from '@/utils/type';


export const getDeltaTextStyle = (delta: Nullable<number>) => {
  if (delta == null) {
    return null;
  }

  const deltaAbs = Math.abs(delta);

  if (deltaAbs < 0.3) {
    return clsx('text-red-400');
  }

  if (deltaAbs < 0.4) {
    return clsx('text-orange-400');
  }

  if (deltaAbs < 0.5) {
    return clsx('text-yellow-400');
  }

  if (deltaAbs < 0.7) {
    return clsx('text-green-400');
  }

  return clsx('text-slate-400');
};
