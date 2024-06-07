import React from 'react';

import {WindowLayout} from '@/ui/index/common/layout';
import {OptionChainInput} from '@/ui/options/chain/input';
import {OptionChainTable} from '@/ui/options/chain/table/main';


export const OptionChain = () => {
  return (
    <WindowLayout className="gap-1.5" fullHeight={false}>
      <OptionChainInput/>
      <OptionChainTable/>
    </WindowLayout>
  );
};
