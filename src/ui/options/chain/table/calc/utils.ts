import {PxOfContract} from '@/types/data/px';
import {getReferencePx} from '@/utils/calc/tick';
import {Nullable} from '@/utils/type';


type GetTimeNeutralUnderlyingMovementPercentOpts = {
  optionsPx: Nullable<PxOfContract>,
  underlyingPx: Nullable<PxOfContract>,
};

export const getTimeNeutralUnderlyingMovementPercent = ({
  optionsPx,
  underlyingPx,
}: GetTimeNeutralUnderlyingMovementPercentOpts) => {
  const theta = optionsPx?.Theta;
  const delta = optionsPx?.Delta;
  const spotPx = getReferencePx(underlyingPx);

  if (!theta || !delta || !spotPx) {
    return null;
  }

  return -theta / delta / spotPx * 100;
};
