import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PageLayout} from '@/ui/base/layout';
import {Orders} from '@/ui/index/order/main';
import {Positions} from '@/ui/index/positions/main';
import {AccountSummary} from '@/ui/index/summary/main';


export const Account = () => {
  return (
    <PageLayout>
      <Flex direction="row" className="gap-common h-1/2">
        <div className="grow overflow-auto">
          <Positions/>
        </div>
        <div>
          <AccountSummary/>
        </div>
      </Flex>
      <Flex direction="row" className="gap-common h-1/2">
        <Orders/>
      </Flex>
    </PageLayout>
  );
};
