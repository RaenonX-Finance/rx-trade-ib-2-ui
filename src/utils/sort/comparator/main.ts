import {SortingComparablePrimitive} from '@/utils/sort/type';

// Comparator to sort in ascending order.
export const sortingComparatorAsc = <T extends SortingComparablePrimitive>(a: T, b: T): number => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};

// Comparator to sort in descending order.
export const sortingComparatorDesc = <T extends SortingComparablePrimitive>(a: T, b: T): number => {
  if (a < b) {
    return 1;
  }

  if (a > b) {
    return -1;
  }

  return 0;
};
