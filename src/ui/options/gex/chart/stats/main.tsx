import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {OptionsGexStatsLayout} from '@/ui/options/gex/chart/stats/layout';
import {useOptionsGexStats} from '@/ui/options/gex/stats/hook';


export const OptionsGexStats = () => {
  const gexStats = useOptionsGexStats();

  return (
    <Flex center direction="row" className="gap-2 leading-none">
      <OptionsGexStatsLayout
        name="Gamma Field"
        value={gexStats?.gammaField}
      />
      <OptionsGexStatsLayout
        name="Gamma Flip"
        value={gexStats?.gammaFlip}
      />
    </Flex>
  );
};
