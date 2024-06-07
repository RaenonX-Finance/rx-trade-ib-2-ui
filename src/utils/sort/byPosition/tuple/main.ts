import {sortTupleAsc, sortTupleDesc} from '@/utils/sort/byKey/tuple/main';
import {SortingComparablePrimitive, SortingComparator} from '@/utils/sort/type';


export const sortTupleAscByPosition = <T extends SortingComparablePrimitive>(
  source: T[][],
): SortingComparator<number> => sortTupleAsc<number>((k) => source[k]);

export const sortTupleDescByPosition = <T extends SortingComparablePrimitive>(
  source: T[][],
): SortingComparator<number> => sortTupleDesc<number>((k) => source[k]);
