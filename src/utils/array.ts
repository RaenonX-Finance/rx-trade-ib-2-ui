export const mergeThenSort = <T>(original: T[], newer: T[], getSortBasis: (item: T) => number): T[] => {
  return Object.values(Object.fromEntries(original.concat(...newer).map((item) => [getSortBasis(item), item])))
    .sort((a, b) => getSortBasis(a) - getSortBasis(b));
};

export const isSubset = <T>(superSet: T[], toContain: T[]) => toContain.every((element) => superSet.includes(element));
