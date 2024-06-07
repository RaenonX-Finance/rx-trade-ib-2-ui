'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PageLayout} from '@/ui/base/layout';
import {Orders} from '@/ui/index/order/main';
import {Positions} from '@/ui/index/positions/main';
import {AccountSummary} from '@/ui/index/summary/main';


const Main = () => {
  return (
    <PageLayout>
      <Flex direction="row" className="h-1/2 gap-2">
        <div className="grow overflow-auto">
          <Positions/>
        </div>
        <div>
          <AccountSummary/>
        </div>
      </Flex>
      <Flex direction="row" className="h-1/2 gap-2">
        <Orders/>
      </Flex>
    </PageLayout>
  );
};

export default Main;
