import React from 'react';

import {classNames} from '@/utils/react';

import styles from './main.module.css';


type Props = {
  header: React.ReactNode,
  body: React.ReactNode,
};

export const Table = ({header, body}: Props) => {
  return (
    <table className="w-full text-sm text-white">
      <thead>
        <tr className={classNames(
          'sticky top-0 whitespace-nowrap bg-gradient-to-r from-slate-800 to-gray-950 text-right',
          styles['table-row'],
        )}>
          {header}
        </tr>
      </thead>
      <tbody className="bg-gray-800">
        {body}
      </tbody>
    </table>
  );
};
