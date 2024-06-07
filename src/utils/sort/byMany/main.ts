import {SortingComparator} from '@/utils/sort/type';


export const sortByMany = <T>(
  ...comparators: SortingComparator<T>[]
): SortingComparator<T> => (
  a: T, b: T,
) => {
  for (const comparator of comparators) {
    const result = comparator(a, b);
    if (result !== 0) {
      return result;
    }
  }

  return 0;
};
