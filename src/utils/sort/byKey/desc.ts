import {sortingComparatorDesc} from '@/utils/sort/comparator/main';
import {SortingComparablePrimitive, SortingComparator, SortingKey} from '@/utils/sort/type';


// Create a comparator to sort an array of primitives in descending order.
export function sortDesc<T extends SortingComparablePrimitive>(): SortingComparator<T>;

// Create a comparator to sort an array of objects
// in descending order by a primitive sort key.
export function sortDesc<T>(key: SortingKey<T>): SortingComparator<T>;

export function sortDesc<T>(
  key: SortingKey<T> = (x: T) => (x as SortingComparablePrimitive),
): SortingComparator<T> {
  return (a: T, b: T) => sortingComparatorDesc(key(a), key(b));
}
