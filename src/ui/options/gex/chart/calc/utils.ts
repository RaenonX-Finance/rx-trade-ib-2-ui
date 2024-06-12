import {PxOfContract} from '@/types/data/px';
import {getReferencePx} from '@/utils/calc/tick';
import {Nullable} from '@/utils/type';


type GetOptionsGammaExposureOfSideOpts = {
  optionsPx: Nullable<PxOfContract>,
  spotPx: Nullable<PxOfContract>,
};

export const getOptionsGammaExposureOfSide = ({optionsPx, spotPx}: GetOptionsGammaExposureOfSideOpts): number => {
  if (!optionsPx || !spotPx) {
    return 0;
  }

  // Squaring the spot price then (x 0.01) for calculating the 1% move
  // https://perfiliev.co.uk/market-commentary/how-to-calculate-gamma-exposure-and-zero-gamma-level/
  return (
    // Option OI
    ((optionsPx?.OptionCallOpenInterest ?? 0) + (optionsPx?.OptionPutOpenInterest ?? 0)) *
    // Option gamma
    (optionsPx?.Gamma ?? 0) *
    // Spot price
    (getReferencePx(spotPx) ** 2 * 0.01) *
    // Option multiplier
    100
  );
};
