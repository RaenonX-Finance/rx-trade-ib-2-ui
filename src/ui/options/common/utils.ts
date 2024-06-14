import minBy from 'lodash/minBy';

import {PxOfContract} from '@/types/data/px';
import {getReferencePx} from '@/utils/calc/tick';
import {Nullable} from '@/utils/type';


type GetClosestStrikeFromPxOpts = {
  strikes: number[],
  px: number,
};

export const getClosestStrikeFromPx = ({
  strikes,
  px,
}: GetClosestStrikeFromPxOpts) => {
  return minBy(strikes, (strike) => Math.abs(strike - px));
};

type GetClosestStrikeFromContractOpts = {
  strikes: number[],
  spotPx: Nullable<PxOfContract>,
};

export const getClosestStrikeFromContract = ({
  strikes,
  spotPx,
}: GetClosestStrikeFromContractOpts) => {
  return getClosestStrikeFromPx({strikes, px: getReferencePx(spotPx)});
};
