import React from 'react';

import {PageLayout} from '@/ui/base/layout';
import {OptionChain} from '@/ui/options/chain/main';
import {OptionsGex} from '@/ui/options/gex/main';
import {OptionsVolatilityHistory} from '@/ui/options/volatility/main';


export const Options = () => {
  return (
    <PageLayout>
      <OptionsGex/>
      <OptionsVolatilityHistory/>
      <OptionChain/>
    </PageLayout>
  );
};
