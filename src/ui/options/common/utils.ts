import minBy from 'lodash/minBy';


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
  spotPx: number,
};

export const getClosestStrikeFromContract = ({
  strikes,
  spotPx,
}: GetClosestStrikeFromContractOpts) => {
  return getClosestStrikeFromPx({strikes, px: spotPx});
};
