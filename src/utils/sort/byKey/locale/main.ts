import {sortWithLocaleDefaultCollator, sortWithLocaleDefaultKey} from '@/utils/sort/byKey/locale/const';
import {SortingComparator, SortingStringKey} from '@/utils/sort/type';

// Culture-aware string comparisons.
// Useful to control how case, accents and numbers-in-string are compared.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator.
//
// For array of strings, and ascending order, this will work:
// - `arr.toSorted(collator.compare)`
// - Helpers are still there for the other use cases.

export function sortWithLocaleAsc <T extends string>(collator?: Intl.Collator): SortingComparator<T>;

export function sortWithLocaleAsc <T>(
  collator: Intl.Collator,
  key: SortingStringKey<T>,
): SortingComparator<T>;

export function sortWithLocaleAsc <T>(
  collator: Intl.Collator = sortWithLocaleDefaultCollator,
  key: SortingStringKey<T> = sortWithLocaleDefaultKey,
): SortingComparator<T> {
  return (a: T, b: T) => collator.compare(key(a), key(b));
}

export const sortWithDefaultLocaleAsc = <T>(key: SortingStringKey<T> = sortWithLocaleDefaultKey) => (
  sortWithLocaleAsc(sortWithLocaleDefaultCollator, key)
);

export function sortWithLocaleDesc <T extends string>(collator?: Intl.Collator): SortingComparator<T>;

export function sortWithLocaleDesc <T>(
  collator: Intl.Collator,
  key: SortingStringKey<T>,
): SortingComparator<T>;

export function sortWithLocaleDesc <T>(
  collator: Intl.Collator = sortWithLocaleDefaultCollator,
  key: SortingStringKey<T> = sortWithLocaleDefaultKey,
): SortingComparator<T> {
  // There's no built-in collator descending, but we can swap inputs.
  return (a: T, b: T) => collator.compare(key(b), key(a));
}

export const sortWithDefaultLocaleDesc = <T>(key: SortingStringKey<T> = sortWithLocaleDefaultKey) => (
  sortWithLocaleDesc(sortWithLocaleDefaultCollator, key)
);
