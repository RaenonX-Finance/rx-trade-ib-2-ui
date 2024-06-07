import {generateRangeOfNumber} from '@/utils/number/generate/range';
import {sortAscNullAsLast, sortDescNullAsLast} from '@/utils/sort/byKey/nullable/main';
import {sortByMany} from '@/utils/sort/byMany/main';
import {sortingMapSortedIndexes} from '@/utils/sort/byPosition/indexes/main';
import {SortingComparablePrimitive, SortingComparator} from '@/utils/sort/type';


// There's no overload of comparator(a, b) that include positions.
// So instead of producing a `SortingComparator`, we control the whole process.
//
// Each comparator is bound to its data source.
// Those data sources are synced by positions.

export const sortByPosition = <T>(
  source: T[],
  ...comparators: SortingComparator<number>[]
) => (
  sortingMapSortedIndexes({
    source,
    idxList: [...generateRangeOfNumber({max: source.length})].toSorted(sortByMany(...comparators)),
  })
);

export const sortByPositionAsc = <T extends SortingComparablePrimitive>(
  source: T[],
): SortingComparator<number> => (
  sortAscNullAsLast<number>((k) => source[k])
);

export const sortByPositionDesc = <T extends SortingComparablePrimitive>(
  source: T[],
): SortingComparator<number> => (
  sortDescNullAsLast<number>((k) => source[k])
);


