import React from 'react';

import {AutoOverflowWindowLayout} from '@/ui/index/common/layout';
import {OptionChainParams} from '@/ui/options/chain/params';
import {OptionChainTable} from '@/ui/options/chain/table/main';


export const OptionChain = () => {
  return (
    <AutoOverflowWindowLayout>
      <div className="flex flex-col gap-1.5">
        <div>
          <OptionChainParams/>
        </div>
        <div>
          <OptionChainTable/>
        </div>
      </div>
    </AutoOverflowWindowLayout>
  );
};
