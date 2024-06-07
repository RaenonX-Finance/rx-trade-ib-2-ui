'use client';
import React from 'react';

import {clsx} from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Flex} from '@/components/layout/flex/common';
import {NavEntries} from '@/ui/base/navbar/const';
import {AccountSwitch} from '@/ui/index/accountSwitch/main';


export const NavBar = () => {
  const pathname = usePathname();

  return (
    <Flex direction="row" className="gap-2">
      <ul className="flex flex-wrap gap-2 border-b border-gray-700 text-center text-sm text-gray-400">
        {NavEntries.map(({text, href, activeTextClassName}) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                'transform-smooth inline-block rounded-t-lg px-2 py-1',
                href === pathname ? `bg-gray-800 ${activeTextClassName}` : 'hover:bg-gray-800 hover:text-gray-300',
              )}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto self-center">
        <AccountSwitch/>
      </div>
    </Flex>
  );
};
