import React from 'react';

import {ArrowPathIcon} from '@heroicons/react/24/outline';

import {Flex} from '@/components/layout/flex/common';
import {useOptionGexUnderlyingPxSelector} from '@/state/option/selector';
import {OptionsGexStatsLayout} from '@/ui/options/gex/chart/stats/layout/main';
import {OptionsGexSignIcon} from '@/ui/options/gex/chart/stats/sign/main';
import {OptionsGexStatsResponse} from '@/ui/options/gex/stats/type';
import {getReferencePx} from '@/utils/calc/tick';
import {Nullable} from '@/utils/type';


type Props = {
  gexStats: OptionsGexStatsResponse | null,
  underlyingPxOverride: Nullable<number>,
  onRefreshClicked: () => void,
};

export const OptionsGexStats = ({gexStats, underlyingPxOverride, onRefreshClicked}: Props) => {
  const underlyingPx = useOptionGexUnderlyingPxSelector();

  const underlyingCurrentPx = React.useMemo(
    () => underlyingPxOverride ?? getReferencePx(underlyingPx),
    [underlyingPxOverride, underlyingPx],
  );

  return (
    <Flex center direction="row" className="rounded-lg bg-slate-950 p-2">
      <Flex center className="gap-2 leading-none">
        <OptionsGexStatsLayout
          name="Gamma Field"
          values={[gexStats?.gammaField]}
          spotPx={underlyingCurrentPx}
          className="text-fuchsia-300"
        />
        <OptionsGexStatsLayout
          name="Gamma Flip"
          values={gexStats?.gammaFlip ?? []}
          spotPx={underlyingCurrentPx}
          renderInBetweenItem={(prev, next, idx) => (
            <OptionsGexSignIcon rangeStart={prev} rangeEnd={next} idx={idx} currentPx={underlyingCurrentPx}/>
          )}
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
