import {sortingNullFirstComparator, sortingNullLastComparator} from '@/utils/sort/byKey/nullable/wrap';
import {sortingComparatorAsc, sortingComparatorDesc} from '@/utils/sort/comparator/main';
import {SortingComparator, SortingKeyNullable} from '@/utils/sort/type';


export const sortAscNullAsFirst = <T>(
  key: SortingKeyNullable<T>,
): SortingComparator<T> => {
  const compare = sortingNullFirstComparator(sortingComparatorAsc);
  return (a: T, b: T) => compare(key(a), key(b));
};

export const sortAscNullAsLast = <T>(
  key: SortingKeyNullable<T>,
): SortingComparator<T> => {
  const compare = sortingNullLastComparator(sortingComparatorAsc);
  return (a: T, b: T) => compare(key(a), key(b));
};

export const sortDescNullAsFirst = <T>(
  key: SortingKeyNullable<T>,
): SortingComparator<T> => {
  const compare = sortingNullFirstComparator(sortingComparatorDesc);
  return (a: T, b: T) => compare(key(a), key(b));
};

export const sortDescNullAsLast = <T>(
  key: SortingKeyNullable<T>,
): SortingComparator<T> => {
  const compare = sortingNullLastComparator(sortingComparatorDesc);
  return (a: T, b: T) => compare(key(a), key(b));
};
