import React from 'react';

import {clsx} from 'clsx';


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  classOfBorder?: string,
};

export const InputBox = ({className, classOfBorder, ...props}: Props) => (
  <input
    autoFocus={false}
    className={clsx(
      'border-b bg-transparent text-center focus:outline-none',
      classOfBorder ?? 'border-gray-300/50',
      className,
    )}
    {...props}
  />
);
