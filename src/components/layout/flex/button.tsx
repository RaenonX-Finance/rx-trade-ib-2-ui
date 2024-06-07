import React from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  disabled?: boolean,
} & ({
  isSubmit: true,
  onClick?: () => void,
} | {
  isSubmit?: boolean,
  onClick: () => void,
});

const FlexButtonInternal = ({
  direction = 'row',
  noFullWidth = true,
  onClick,
  disabled,
  isSubmit,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLButtonElement>) => (
  <button
    ref={ref}
    type={isSubmit ? 'submit' : 'button'}
    onClick={onClick}
    disabled={disabled}
    className={getFlexStyles(direction, {noFullWidth, ...props})}
  >
    {children}
  </button>
);

// This is only usable if the children is not a single node of icon
// Otherwise, the icon will fail to render on Apple device
// See https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui-core/issues/370
export const FlexButton = React.forwardRef(FlexButtonInternal);
