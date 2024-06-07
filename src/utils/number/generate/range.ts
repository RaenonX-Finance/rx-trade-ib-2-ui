export type GenerateRangeOfNumberOpts = {
  min?: number,
  // This is exclusive
  max: number,
  maxInclusive?: boolean,
  interval?: number,
};

export function* generateRangeOfNumber({
  min,
  max,
  maxInclusive,
  interval,
}: GenerateRangeOfNumberOpts): Generator<number> {
  if (interval && interval < 1) {
    throw new Error(`interval has to be > 1`);
  }

  for (let i = (min ?? 0); i < max + (maxInclusive ? 1 : 0); i += (interval ?? 1)) {
    yield i;
  }
}
