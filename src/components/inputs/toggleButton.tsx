import React from 'react';

import {clsx} from 'clsx';


export type ToggleButtonProps = {
  active: boolean,
  text: string,
  onClick: () => void,
  disabled?: boolean,
  getClassName?: (active: boolean) => string,
  classOfText?: string,
  className?: string,
};

export const ToggleButton = ({
  active,
  text,
  onClick,
  disabled,
  getClassName,
  classOfText,
  className,
}: ToggleButtonProps) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={clsx(
      'transform-smooth flex rounded-lg px-2 py-1',
      getClassName ? getClassName(active) : (active ? 'hover:text-gray-100' : 'hover:text-gray-200'),
      classOfText ?? 'text-sm',
      className,
    )}>
      {text}
    </button>
  );
};
