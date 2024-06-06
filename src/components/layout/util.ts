import {clsx} from 'clsx';

import {LayoutProps} from '@/components/layout/type';


export const getLayoutClassNames = ({center, stretch, noFullWidth, className}: LayoutProps) => clsx(
  center && 'place-content-center place-items-center items-center text-center',
  stretch && 'items-stretch justify-stretch self-stretch',
  !noFullWidth && 'w-full',
  className,
);
