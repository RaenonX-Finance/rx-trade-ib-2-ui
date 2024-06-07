import {SortingRankValueGetter} from '@/utils/sort/byPosition/rank/type';


export const sortingRankGetterOfDense: SortingRankValueGetter = (
  distinctCount: number, _: number, __: number,
) => distinctCount;

export const sortingRankGetterOfMax: SortingRankValueGetter = (
  _: number, __: number, nextCursor: number,
) => nextCursor;

export const sortingRankGetterOfMin: SortingRankValueGetter = (
  _: number, cursor: number, __: number,
) => cursor + 1;

export const sortingRankGetterOfAvg: SortingRankValueGetter = (
  _: number, cursor: number, nextCursor: number,
) => 0.5 * (cursor + 1 + nextCursor);
