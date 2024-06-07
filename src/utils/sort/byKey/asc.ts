import {sortingComparatorAsc} from '@/utils/sort/comparator/main';
import {SortingComparablePrimitive, SortingComparator, SortingKey} from '@/utils/sort/type';


// Create a comparator to sort an array of primitives in ascending order.
export function sortAsc<T extends SortingComparablePrimitive>(): SortingComparator<T>;

// Create a comparator to sort an array of objects.
// in ascending order by a primitive sort key
export function sortAsc<T>(key: SortingKey<T>): SortingComparator<T>;

export function sortAsc<T>(
  // The only overload that allows to use the default value
  // also checks that T is `ComparablePrimitive`.
  // This make the type assertion `as ComparablePrimitive` valid.
  key: SortingKey<T> = (x: T) => (x as SortingComparablePrimitive),
): SortingComparator<T> {
  return (a: T, b: T) => sortingComparatorAsc(key(a), key(b));
}
