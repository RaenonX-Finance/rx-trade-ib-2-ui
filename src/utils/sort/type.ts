import {Nullable} from '@/utils/type';


export type SortOrder = 'asc' | 'desc';

// This can include primitives, but also objects, tuples, etc.
export type SortingComparator<T> = (a: T, b: T) => number;

// Types for which operators `<`, `>` are valid (without casting everything to string)
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than
export type SortingComparablePrimitive = number | string | boolean | bigint | Date;

// Sort key on objects
export type SortingKeyBase<TTarget, TKey> = (a: TTarget) => TKey;

export type SortingKey<T> = SortingKeyBase<T, SortingComparablePrimitive>;

export type SortingKeyNullable<T> = SortingKeyBase<T, Nullable<SortingComparablePrimitive>>;

export type SortingTupleKey<T> = SortingKeyBase<T, SortingComparablePrimitive[]>;

export type SortingStringKey<T> = SortingKeyBase<T, string>;

export type SortingBoolKey<T> = SortingKeyBase<T, boolean>;
