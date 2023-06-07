'use client';
import React from 'react';

import {FullWidthRow} from '@/components/row/fullWidthRow';
import {PageLayout} from '@/ui/base/layout';
import {Orders} from '@/ui/index/order/main';
import {Positions} from '@/ui/index/positions/main';
import {AccountSummary} from '@/ui/index/summary/main';


const Main = () => {
  return (
    <PageLayout>
      <FullWidthRow className="h-1/2">
        <div className="grow overflow-auto">
          <Positions/>
        </div>
        <div>
          <AccountSummary/>
        </div>
      </FullWidthRow>
      <FullWidthRow className="h-1/2">
        <Orders/>
      </FullWidthRow>
    </PageLayout>
  );
};

export default Main;
