import React from 'react';

import {WindowLayout} from '@/ui/index/common/layout';
import {OptionChainParams} from '@/ui/options/chain/params';
import {OptionChainTable} from '@/ui/options/chain/table/main';


export const OptionChain = () => {
  return (
    <WindowLayout className="gap-1.5" fullHeight={false}>
      <OptionChainParams/>
      <OptionChainTable/>
    </WindowLayout>
  );
};
