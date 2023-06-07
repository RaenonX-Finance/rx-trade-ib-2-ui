import React from 'react';

import {classNames} from '@/utils/react';


export type ToggleButtonProps = {
  active: boolean,
  title: string,
  onChange: () => void,
  className: string,
  defaultTextClassName?: string,
};

export const ToggleButton = ({active, title, onChange, className, defaultTextClassName}: ToggleButtonProps) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        id={title}
        className="peer hidden"
        checked={active}
        onChange={onChange}
      />
      <label
        htmlFor={title}
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
