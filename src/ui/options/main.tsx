import React from 'react';

import {PageLayout} from '@/ui/base/layout';
import {OptionChain} from '@/ui/options/chain/main';
import {OptionsGex} from '@/ui/options/gex/main';


export const Options = () => {
  return (
    <PageLayout>
      <OptionChain/>
      <OptionsGex/>
    </PageLayout>
  );
};
