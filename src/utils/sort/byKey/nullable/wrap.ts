import {SortingComparator} from '@/utils/sort/type';
import {Nullable} from '@/utils/type';


// Sort null-ish values then
// delegates to another comparator
// with a `NonNullable<T>` input

export const sortingNullFirstComparator = <T>(
  thenBy: SortingComparator<T>,
): SortingComparator<Nullable<T>> => (
  a: Nullable<T>,
  b: Nullable<T>,
) => {
  if (a == null && b == null) {
    return 0;
  }

  if (a == null) {
    return -1;
  }

  if (b == null) {
    return 1;
  }

  return thenBy(a, b);
};

export const sortingNullLastComparator = <T>(
  thenBy: SortingComparator<T>,
): SortingComparator<Nullable<T>> => (
  a: Nullable<T>,
  b: Nullable<T>,
) => {
  if (a == null && b == null) {
    return 0;
  }

  if (a == null) {
    return 1;
  }

  if (b == null) {
    return -1;
  }

  return thenBy(a, b);
};
