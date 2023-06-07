import React from 'react';

import styles from './main.module.css';


type Props = {
  className: string,
};

export const TableRow = ({className, children}: React.PropsWithChildren<Props>) => {
  return (
    <tr className={`${className} ${styles['table-row']}`}>
      {children}
    </tr>
  );
};
