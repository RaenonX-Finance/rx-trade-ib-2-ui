/**
 * @param {number} distinctCount Count of distinct items less or equal to current.
 * @param {number} cursor First cursor with current value
 * @param {number} nextCursor First cursor, following current, with a different value
 * (will reach one position out of bound)
 */
export type SortingRankValueGetter = (distinctCount: number, cursor: number, nextCursor: number) => number;
