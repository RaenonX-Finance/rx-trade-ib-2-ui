import {sortAsc} from '@/utils/sort/byKey/asc';
import {sortDesc} from '@/utils/sort/byKey/desc';
import {SortingComparablePrimitive, SortingComparator, SortingKey, SortOrder} from '@/utils/sort/type';


// Create a comparator to sort an array of primitives in `order`.
export function sortAuto<T extends SortingComparablePrimitive>(order: SortOrder): SortingComparator<T>;

// Create a comparator to sort an array of objects
// in `order` by a primitive sort key.
export function sortAuto<T>(order: SortOrder, key: SortingKey<T>): SortingComparator<T>;

export function sortAuto<T>(
  order: SortOrder,
  key: SortingKey<T> = (x: T) => (x as SortingComparablePrimitive),
): SortingComparator<T> {
  if (order === 'asc') {
    return sortAsc(key);
  }

  if (order === 'desc') {
    return sortDesc(key);
  }

  throw new Error(`Unhandled data order of [${order satisfies never}] during sorter construction`);
}
