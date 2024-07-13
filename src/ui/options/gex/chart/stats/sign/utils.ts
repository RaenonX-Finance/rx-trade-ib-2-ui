import {OptionsGexSignIconCommonProps} from '@/ui/options/gex/chart/stats/sign/type';


export const isCurrentPxInRange = ({
  rangeStart,
  rangeEnd,
  currentPx,
}: OptionsGexSignIconCommonProps): boolean => {
  if (rangeStart == null || rangeEnd == null) {
    if (rangeStart == null && rangeEnd != null) {
      return currentPx < rangeEnd;
    }

    if (rangeStart != null && rangeEnd == null) {
      return currentPx >= rangeStart;
    }

    // Both open-ended
    return false;
  }

  return currentPx >= rangeStart && currentPx < rangeEnd;
};
