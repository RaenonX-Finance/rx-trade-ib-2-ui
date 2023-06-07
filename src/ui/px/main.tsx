import React from 'react';

import {PageLayout} from '@/ui/base/layout';
import {SinglePriceQuote} from '@/ui/px/single/main';


export const Main = () => {
  return (
    <PageLayout>
      <div className="flex flex-wrap gap-2">
        {[...Array(16).keys()].map((index) => {
          return (
            <SinglePriceQuote
              key={index}
              index={index}
              className="width-with-gap md:width-with-gap-2-items lg:width-with-gap-3-items xl:width-with-gap-4-items"
            />
          );
        })}
      </div>
    </PageLayout>
  );
};
