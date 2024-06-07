import {generateRangeOfNumber} from '@/utils/number/generate/range';
import {sortingBindToPositions} from '@/utils/sort/byPosition/bind/main';
import {SortingComparator} from '@/utils/sort/type';

// Find the values of indexes that would sort an array.
// Does not modify `source`.
export const sortingGetSortedIndexes = <T>(
  source: T[],
  comparator: SortingComparator<T>,
) => [...generateRangeOfNumber({max: source.length})]
  .toSorted(sortingBindToPositions(comparator, source));

type SortingIsValidIndexOpts<T> = {
  idx: number,
  source: T[],
  throwOnMissing?: boolean,
};

const sortingIsValidIndex = <T>({
  idx,
  source,
  throwOnMissing,
}: SortingIsValidIndexOpts<T>) => {
  if (idx in source) {
    return true;
  }

  if (throwOnMissing) {
    throw Error(`Invalid index: ${idx} on ${source}`);
  }

  return false;
};

type SortingMapSortedIndexesOpts<T> = {
  source: T[],
  idxList: number[],
  throwOnMissing?: boolean,
};

// Use sorted indexes to make a sorted copy of the array
// Missing indexes strategy can be either skip or throw.
export const sortingMapSortedIndexes = <T>({
  source,
  idxList,
  throwOnMissing,
}: SortingMapSortedIndexesOpts<T>): T[] => (
  idxList
    .filter((idx) => sortingIsValidIndex({idx, source, throwOnMissing}))
    .map((idx) => source[idx])
);
