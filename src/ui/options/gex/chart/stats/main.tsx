import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {useOptionGexUnderlyingPxSelector} from '@/state/option/selector';
import {OptionsGexStatsLayout} from '@/ui/options/gex/chart/stats/layout';
import {useOptionsGexStats} from '@/ui/options/gex/stats/hook';
import {getReferencePx} from '@/utils/calc/tick';


export const OptionsGexStats = () => {
  const gexStats = useOptionsGexStats();
  const underlyingPx = useOptionGexUnderlyingPxSelector();

  const underlyingCurrentPx = getReferencePx(underlyingPx);

  return (
    <Flex center direction="row" className="gap-2 leading-none">
      <OptionsGexStatsLayout
        name="Gamma Field"
        value={gexStats?.gammaField}
        spotPx={underlyingCurrentPx}
      />
      <OptionsGexStatsLayout
        name="Gamma Flip"
        value={gexStats?.gammaFlip}
        spotPx={underlyingCurrentPx}
      />
    </Flex>
  );
};
