import React from 'react';


type Props = {
  title: string,
  value: React.ReactNode,
};

export const SummaryValueCell = ({title, value}: Props) => {
  return (
    <div className="flex flex-col text-center">
      <div className="text-xs">
        {title}
      </div>
      <div className="text-xl">
        {value}
      </div>
    </div>
  );
};
