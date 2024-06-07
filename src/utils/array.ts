import {sortAsc} from '@/utils/sort/byKey/asc';


export const mergeThenSort = <T>(original: T[], newer: T[], getSortBasis: (item: T) => number): T[] => {
  return Object.values(Object.fromEntries(original.concat(...newer).map((item) => [getSortBasis(item), item])))
    .toSorted(sortAsc(getSortBasis));
};

export const isSubset = <T>(superSet: T[], toContain: T[]) => toContain.every((element) => superSet.includes(element));
