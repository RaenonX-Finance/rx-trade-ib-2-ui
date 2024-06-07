type GetStrikeRangeToRequestOpts = {
  priceBase: number,
  strikeRangePercent: number | null,
  possibleStrikes: number[],
};

export const getStrikeRangeToRequest = ({
  priceBase,
  strikeRangePercent,
  possibleStrikes,
}: GetStrikeRangeToRequestOpts): number[] => {
  if (strikeRangePercent === null) {
    return possibleStrikes;
  }

  const strikeRangeRate = strikeRangePercent / 100;
  const strikeLowerBound = priceBase * (1 - strikeRangeRate);
  const strikeUpperBound = priceBase * (1 + strikeRangeRate);

  return possibleStrikes.filter((singleStrike) => (
    strikeLowerBound <= singleStrike && singleStrike <= strikeUpperBound
  ));
};
