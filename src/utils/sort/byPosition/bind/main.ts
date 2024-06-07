import {SortingComparator} from '@/utils/sort/type';


// Convert a value comparator to a position comparator.
// Resulting comparator is bound to a specific collection.
export const sortingBindToPositions = <T>(
  compare: SortingComparator<T>,
  source: T[],
): SortingComparator<number> => (
  a: number,
  b: number,
) => compare(source[a], source[b]);
