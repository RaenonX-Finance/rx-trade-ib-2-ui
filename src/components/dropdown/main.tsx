import React from 'react';

import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import {clsx} from 'clsx';

import {SelectItem} from '@/components/dropdown/type';


type Props = {
  title: string,
  buttonText: React.ReactNode,
  items: SelectItem[][],
  disabled?: boolean,
  showIcon?: boolean,
  buttonClassName?: string,
  itemsClassName?: string,
  itemClassName?: string,
};

export const Dropdown = ({
  title,
  buttonText,
  items,
  disabled,
  showIcon = true,
  buttonClassName,
  itemsClassName,
  itemClassName,
}: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className={clsx(
            'inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-2 py-1',
            'text-sm text-gray-200 hover:bg-indigo-700 disabled:bg-gray-700',
            buttonClassName,
          )}
          title={title}
          disabled={disabled}
        >
          {buttonText}
          {showIcon && <ChevronDownIcon className="-mr-1 size-5 text-gray-200"/>}
        </MenuButton>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className={clsx(
          'absolute right-0 z-30 mt-2 max-h-48 w-40 origin-top-right divide-y divide-gray-100 rounded-md',
          'bg-gradient-to-br from-indigo-950 to-indigo-900 ring-1 ring-inset ring-indigo-500 focus:outline-none',
          'overflow-auto',
          itemsClassName,
        )}>
          {items.map((itemsOfSection, sectionIdx) => (
            <div className="p-1" key={sectionIdx}>
              {itemsOfSection.map(({text, disabled: itemDisabled, onSelected}, idx) => {
                return (
                  <MenuItem key={idx} disabled={itemDisabled}>
                    {({focus, disabled}) => (
                      <a
                        className={clsx(
                          disabled ?
                            'text-slate-500' :
                            (focus ? 'bg-indigo-600 text-gray-200' : 'text-slate-200'),
                          'block rounded-md px-1.5 py-1 text-sm',
                          itemClassName,
                        )}
                        onClick={onSelected}
                      >
                        {text}
                      </a>
                    )}
                  </MenuItem>
                );
              })}
            </div>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};
