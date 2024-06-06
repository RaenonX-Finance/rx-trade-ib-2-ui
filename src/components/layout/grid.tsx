import React from 'react';

import {clsx} from 'clsx';

import {LayoutProps} from '@/components/layout/type';
import {getLayoutClassNames} from '@/components/layout/util';


type Props = LayoutProps;

const GridInternal = ({
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className={clsx('grid', getLayoutClassNames(props))}>
      {children}
    </div>
  );
};

export const Grid = React.forwardRef(GridInternal);
