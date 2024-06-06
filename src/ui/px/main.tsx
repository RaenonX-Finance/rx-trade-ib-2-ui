import React from 'react';

import {Grid} from '@/components/layout/grid';
import {PageLayout} from '@/ui/base/layout';
import {SinglePriceQuote} from '@/ui/px/single/main';


export const Main = () => {
  return (
    <PageLayout>
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(16).keys()].map((index) => (
          <SinglePriceQuote
            key={index}
            index={index}
          />
        ))}
      </Grid>
    </PageLayout>
  );
};
