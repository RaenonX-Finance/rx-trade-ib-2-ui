import React from 'react';


type Props = {
  header: React.ReactNode,
  body: React.ReactNode,
};

export const Table = ({header, body}: Props) => {
  return (
    <table className="info-table w-full text-sm text-white">
      <thead>
        <tr className="sticky top-0 whitespace-nowrap bg-gradient-to-r from-slate-800 to-gray-950 text-right">
          {header}
        </tr>
      </thead>
      <tbody className="bg-gray-800">
        {body}
      </tbody>
    </table>
  );
};
