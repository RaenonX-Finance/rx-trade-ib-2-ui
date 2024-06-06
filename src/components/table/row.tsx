import React from 'react';


type Props = {
  className: string,
};

export const TableRow = ({className, children}: React.PropsWithChildren<Props>) => {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
};
