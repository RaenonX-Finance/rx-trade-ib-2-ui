import {sortingGetSortedIndexes} from '@/utils/sort/byPosition/indexes/main';
import {sortingRankGetterOfDense} from '@/utils/sort/byPosition/rank/preset';
import {SortingRankValueGetter} from '@/utils/sort/byPosition/rank/type';
import {SortingComparator} from '@/utils/sort/type';


type SortingGetRankListOpts<T> = {
  data: T[],
  comparator: SortingComparator<T>,
  rankGetter?: SortingRankValueGetter,
};

export const sortingGetRankList = <T>({
  data,
  comparator,
  rankGetter = sortingRankGetterOfDense,
}: SortingGetRankListOpts<T>): number[] => {
  const indices = sortingGetSortedIndexes(data, comparator);
  const ranks = new Array(data.length);

  let distinctCount = 0;
  let cursor = 0;

  while (cursor < data.length) {
    // How many duplicate ?
    // We let compareFn decides what is a duplicate (by returning 0)
    let nextCursor = cursor + 1;
    while (nextCursor < data.length) {
      if (comparator(data[indices[nextCursor]], data[indices[cursor]]) !== 0) {
        break;
      }

      nextCursor++;
    }

    // Get rank value,
    // Assign value to current item, and all duplicates
    distinctCount += 1;
    const rankValue = rankGetter(distinctCount, cursor, nextCursor);
    for (let i = cursor; i < nextCursor; i++) {
      ranks[indices[i]] = rankValue;
    }

    cursor = nextCursor;
  }

  return ranks;
};
