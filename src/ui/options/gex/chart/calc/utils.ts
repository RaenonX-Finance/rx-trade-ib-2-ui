import {PxOfContract} from '@/types/data/px';
import {getPx} from '@/utils/calc/px';
import {Nullable} from '@/utils/type';


type GetOptionsGammaExposureOfSideOpts = {
  optionsPx: Nullable<PxOfContract>,
  spotPx: Nullable<PxOfContract>,
};

export const getOptionsGammaExposureOfSide = ({optionsPx, spotPx}: GetOptionsGammaExposureOfSideOpts): number => {
  if (!optionsPx || !spotPx) {
    return 0;
  }

  return (
    // Option OI
    ((optionsPx?.OptionCallOpenInterest ?? 0) + (optionsPx?.OptionPutOpenInterest ?? 0)) *
    // Option gamma
    (optionsPx?.Gamma ?? 0) *
    // Spot price
    getPx(spotPx) *
    // Option multiplier
    100
  );
};
