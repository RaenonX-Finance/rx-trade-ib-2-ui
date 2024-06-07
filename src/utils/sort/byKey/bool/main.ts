import {sortingComparatorAsc, sortingComparatorDesc} from '@/utils/sort/comparator/main';
import {SortingBoolKey, SortingComparator} from '@/utils/sort/type';


export const sortBoolTrueFirst = <T>(
  key: SortingBoolKey<T>,
): SortingComparator<T> => (
  (a: T, b: T) => sortingComparatorDesc(key(a), key(b)) // 1 (true) > 0 (false)
);

export const sortBoolFalseFirst = <T>(
  key: SortingBoolKey<T>,
): SortingComparator<T> => (
  (a: T, b: T) => sortingComparatorAsc(key(a), key(b)) // 0 (false) < 1 (true)
);
