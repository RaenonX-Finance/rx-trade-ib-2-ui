import minBy from 'lodash/minBy';

import {PxOfContract} from '@/types/data/px';
import {getReferencePx} from '@/utils/calc/tick';
import {Nullable} from '@/utils/type';


type GetClosestStrikeOpts = {
  strikes: number[],
  spotPx: Nullable<PxOfContract>,
};

export const getClosestStrike = ({
  strikes,
  spotPx,
}: GetClosestStrikeOpts) => {
  return minBy(
    strikes,
    (strike) => Math.abs(strike - getReferencePx(spotPx)),
  );
};
