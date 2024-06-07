import {sortingComparatorAsc, sortingComparatorDesc} from '@/utils/sort/comparator/main';
import {SortingComparablePrimitive} from '@/utils/sort/type';

// Sorts the list in lexicographical order (like a string)
// - component per component,
// - left to right,
// - then length

export const sortingComparatorListAsc = <T extends SortingComparablePrimitive>(a: T[], b: T[]): number => {
  const n = Math.min(a.length, b.length);

  for (let i = 0; i < n; i++) {
    const comparator = sortingComparatorAsc(a[i], b[i]);

    if (comparator !== 0) {
      return comparator;
    }
  }

  return sortingComparatorAsc(a.length, b.length);
};

export const sortingComparatorListDesc = <T extends SortingComparablePrimitive>(a: T[], b: T[]): number => {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const comparator = sortingComparatorDesc(a[i], b[i]);

    if (comparator !== 0) {
      return comparator;
    }
  }

  return sortingComparatorDesc(a.length, b.length);
};
