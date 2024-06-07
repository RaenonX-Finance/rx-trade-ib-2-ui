const sortingComparatorNumericStringComparer = new Intl.Collator('', {numeric: true}).compare;

// Comparator to sort mixed types in ascending order.
// - Will try to cast both to number first
// - Fallback to numeric aware string comparison
export const sortingComparatorMixedNumericAsc = (a: any, b: any): number => {
  const cmp = a - b;
  return !isNaN(cmp) ? cmp : sortingComparatorNumericStringComparer(a, b);
};

// Comparator to sort mixed types in descending order.
// - Will try to cast both to number first
// - Fallback to numeric aware string comparison
export const sortingComparatorMixedNumericDesc = (a: any, b: any): number => {
  const cmp = b - a;
  return !isNaN(cmp) ? cmp : sortingComparatorNumericStringComparer(b, a);
};
