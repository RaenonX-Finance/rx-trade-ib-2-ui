import React from 'react';


import {WindowLayout} from '@/ui/index/common/layout';
import {OptionsGexChart} from '@/ui/options/gex/chart/main';
import {OptionsGexInput} from '@/ui/options/gex/input';


export const OptionsGex = () => {
  return (
    <WindowLayout className="gap-1.5" fullHeight={false}>
      <div>GEX</div>
      <OptionsGexInput/>
      <OptionsGexChart/>
    </WindowLayout>
  );
};
