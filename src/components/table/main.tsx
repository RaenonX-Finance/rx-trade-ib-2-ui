import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  header: React.ReactNode,
  body: React.ReactNode,
  classOfContainer?: string,
};

export const Table = ({header, body, classOfContainer}: Props) => {
  return (
    <Flex className={clsx('overflow-auto', classOfContainer)}>
      <table className="info-table text-sm text-white">
        <thead>
          <tr className="sticky top-0 whitespace-nowrap bg-gradient-to-r from-slate-800 to-gray-950 text-right">
            {header}
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {body}
        </tbody>
      </table>
    </Flex>
  );
};
