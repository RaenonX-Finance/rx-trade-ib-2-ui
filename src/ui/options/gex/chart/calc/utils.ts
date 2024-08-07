import {OptionPxQuoteOfContract} from '@/ui/options/gex/chart/calc/px/type';
import {Nullable} from '@/utils/type';


type GetOptionsGammaExposureOfSideOpts = {
  optionsPx: Nullable<OptionPxQuoteOfContract>,
  spotPx: number,
};

export const getOptionsGammaExposureOfSide = ({optionsPx, spotPx}: GetOptionsGammaExposureOfSideOpts): number => {
  if (!optionsPx || !spotPx) {
    return 0;
  }

  // Squaring the spot price then (x 0.01) for calculating the 1% move
  // https://perfiliev.co.uk/market-commentary/how-to-calculate-gamma-exposure-and-zero-gamma-level/
  return (
    // Option OI
    (optionsPx?.openInterest ?? 0) *
    // Option gamma
    (optionsPx?.gamma ?? 0) *
    // Spot price
    (spotPx ** 2 * 0.01) *
    // Option multiplier
    100
  );
};
