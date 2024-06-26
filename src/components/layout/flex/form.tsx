import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  action?: () => void,
  onSubmit?: () => Promise<void> | void,
};

const FlexFormInternal = ({
  direction = 'col',
  children,
  action,
  onSubmit,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLFormElement>) => {
  return (
    <form ref={ref} className={getFlexStyles(direction, props)} action={action} onSubmit={(e) => {
      e.preventDefault();

      if (onSubmit) {
        void onSubmit();
      }
    }}>
      {children}
      {/* For allowing form submission on enter (https://stackoverflow.com/q/4196681) */}
      <input type="submit" className="hidden"/>
    </form>
  );
};

export const FlexForm = React.forwardRef(FlexFormInternal);
