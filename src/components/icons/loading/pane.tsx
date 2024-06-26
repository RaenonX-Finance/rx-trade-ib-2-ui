import React from 'react';

import {Loading} from '@/components/icons/loading/icon';


type Props = {
  text: string,
};

export const LoadingPane = ({text}: Props) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-1 text-center">
      <div className="size-6">
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Loading/>
      </div>
      <div>
        {text}
      </div>
    </div>
  );
};
