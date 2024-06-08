import {PxOfContract} from '@/types/data/px';
import {Nullable} from '@/utils/type';


type GetOptionsGammaExposureOfSideOpts = {
  px: Nullable<PxOfContract>,
};

export const getOptionsGammaExposureOfSide = ({px}: GetOptionsGammaExposureOfSideOpts): number => {
  if (!px) {
    return 0;
  }

  return (
    // Option OI
    ((px?.OptionCallOpenInterest ?? 0) + (px?.OptionPutOpenInterest ?? 0)) *
    // Option gamma
    (px?.Gamma ?? 0) *
    // Spot price
    (px?.Last ?? px?.Mark ?? 0) *
    // Option multiplier
    100
  );
};
