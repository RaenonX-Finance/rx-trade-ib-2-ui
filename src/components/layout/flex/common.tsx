import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


const FlexInternal = ({
  direction = 'col',
  children,
  ...props
}: React.PropsWithChildren<FlexCommonProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className={getFlexStyles(direction, props)}>
      {children}
    </div>
  );
};

export const Flex = React.forwardRef(FlexInternal);
