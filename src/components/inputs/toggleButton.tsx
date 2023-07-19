import React from 'react';

import {classNames} from '@/utils/react';


export type ToggleButtonProps = {
  active: boolean,
  id: string,
  title: string,
  onChange: () => void,
  className: string,
  defaultTextClassName?: string,
  disabled?: boolean,
};

export const ToggleButton = ({
  active,
  id,
  title,
  onChange,
  className,
  defaultTextClassName,
  disabled,
}: ToggleButtonProps) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        id={id}
        className="peer hidden"
        checked={active}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={classNames(
          'cursor-pointer select-none rounded-lg px-2 py-1 text-sm transition-colors duration-200 ease-in-out',
          'hover:bg-gray-700 hover:text-gray-200 peer-checked:hover:text-gray-100',
          defaultTextClassName ?? 'text-gray-500',
          className,
        )}
      >
        {title}
      </label>
    </div>
  );
};
