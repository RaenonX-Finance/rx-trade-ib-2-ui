import React from 'react';

import {WindowLayout} from '@/ui/index/common/layout';
import {OptionChainInput} from '@/ui/options/chain/input';
import {OptionChainTable} from '@/ui/options/chain/table/main';

/**
 * DRAFT: Implementations of option chain
 *
 * - Add style on delta 0.3~0.5 / current strike / delta 0.5~0.7
 * - Disable option chain/GEX input until both definition and px data fetch are completed
 * - Theta equivalent to delta / price movement
 * - When option chain is loading, disallow changing inputs
 */

export const OptionChain = () => {
  return (
    <WindowLayout className="gap-1.5" fullHeight={false}>
      <div>Option Chain</div>
      <OptionChainInput/>
      <OptionChainTable/>
    </WindowLayout>
  );
};
