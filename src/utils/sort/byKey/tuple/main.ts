import {sortingComparatorListAsc, sortingComparatorListDesc} from '@/utils/sort/comparator/tuple';
import {SortingComparablePrimitive, SortingComparator, SortingTupleKey} from '@/utils/sort/type';


const sortTupleDefaultKey = <T>(x: T) => (x as SortingComparablePrimitive[]);

// Create a comparator to sort an array of tuple in ascending order.
export function sortTupleAsc <T extends SortingComparablePrimitive[]>(): SortingComparator<T>;

// Create a comparator to sort an array of object in ascending order by a tuple sort key.
export function sortTupleAsc <T>(key: SortingTupleKey<T>): SortingComparator<T>;

export function sortTupleAsc <T>(key: SortingTupleKey<T> = sortTupleDefaultKey): SortingComparator<T> {
  return (a: T, b: T) => sortingComparatorListAsc(key(a), key(b));
}

// Create a comparator to sort an array of tuple in descending order.
export function sortTupleDesc <T extends SortingComparablePrimitive[]>(): SortingComparator<T>;

// Create a comparator to sort an array of object in descending order by a tuple sort key.
export function sortTupleDesc <T>(key: SortingTupleKey<T>): SortingComparator<T>;

export function sortTupleDesc <T>(key: SortingTupleKey<T> = sortTupleDefaultKey): SortingComparator<T> {
  return (a: T, b: T) => sortingComparatorListDesc(key(a), key(b));
}
