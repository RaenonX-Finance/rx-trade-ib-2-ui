'use client';
import React from 'react';

import {FullWidthRow} from '@/components/row/fullWidthRow';
import {PageLayout} from '@/ui/base/layout';
import {OptionChain} from '@/ui/options/chain/main';


const Main = () => {
  return (
    <PageLayout>
      <FullWidthRow className="grow">
        <div className="grow">
          <OptionChain/>
        </div>
      </FullWidthRow>
    </PageLayout>
  );
};

export default Main;
