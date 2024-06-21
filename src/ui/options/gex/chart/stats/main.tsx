import React from 'react';

import {ArrowPathIcon} from '@heroicons/react/24/outline';

import {Flex} from '@/components/layout/flex/common';
import {useOptionGexUnderlyingPxSelector} from '@/state/option/selector';
import {OptionsGexStatsLayout} from '@/ui/options/gex/chart/stats/layout';
import {OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';
import {getReferencePx} from '@/utils/calc/tick';


type Props = {
  gexStats: OptionsGexStatsResponse | null,
  onRefreshClicked: () => void,
};

export const OptionsGexStats = ({gexStats, onRefreshClicked}: Props) => {
  const underlyingPx = useOptionGexUnderlyingPxSelector();

  const underlyingCurrentPx = getReferencePx(underlyingPx);

  return (
    <Flex center direction="row">
      <Flex center direction="row" className="gap-2 leading-none">
        <OptionsGexStatsLayout
          name="Gamma Field"
          value={gexStats?.gammaField}
          spotPx={underlyingCurrentPx}
          className="text-fuchsia-300"
        />
        <OptionsGexStatsLayout
          name="Gamma Flip"
          value={gexStats?.gammaFlip}
          spotPx={underlyingCurrentPx}
          className="text-amber-300"
        />
      </Flex>
      <button
        type="button"
        className="transform-smooth cursor-pointer rounded-lg p-1 hover:bg-sky-700"
        onClick={onRefreshClicked}
      >
        <ArrowPathIcon className="size-5"/>
      </button>
    </Flex>
  );
};
