import React from 'react';

import {WindowLayout} from '@/ui/index/common/layout';
import {OptionChainInput} from '@/ui/options/chain/input';
import {OptionChainTable} from '@/ui/options/chain/table/main';


export const OptionChain = () => {
  return (
    <WindowLayout className="gap-common" fullHeight={false}>
      <div>Option Chain</div>
      <OptionChainInput/>
      <OptionChainTable/>
    </WindowLayout>
  );
};
