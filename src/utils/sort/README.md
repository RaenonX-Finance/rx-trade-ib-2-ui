# Sorting API Usage Docs

### Primitives / Strings / Numbers / Dates

```typescript
const foo = [1, 2, 3];
foo.sort(sortAsc());

const bar = ["hello", "world", "test"];
bar.sort(sortDesc());
```

Culture-aware sorting:

```typescript
const arr = [{date: 1, score: 2}, {date: 2, score: 3}];
arr.sort(sortWithLocaleAsc(opts));
arr.sort(sortWithLocaleDesc(opts));
```

### Objects

Use lambda to configure the sort key.

```typescript
const arr = [{date: 1, score: 2}, {date: 2, score: 3}];
arr.sort(sortAsc(x => x.date));
arr.sort(sortDesc(x => x.score));
```

Or sort by computed values:

```typescript
arr.sort(sortDesc(x => x.score ** 2));
```

### First sort by, then break ties by, then ...

```typescript
const arr = [{date: 1, score: 2}, {date: 2, score: 3}];
arr.sort(
  sortByMany(
    sortAsc(x => x.date),
    sortDesc(x => x.score),
    // ...
  ),
);
```

### Notes on the key getter x => f(x)

Aside from the selection of a sort key on objects,
the key getter, plays a type safety role by requiring
the output to be a `SortingComparablePrimitive`.

> Comparable Primitives are built-in types for which operators `<` and `>` can be used,
> without resorting to string coercion.

- Nullish are comparable primitives but are handled separately/explicitly.
- Tuples are not primitives, but helpers are provided.

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than#description.

> [!NOTE]
> You can still configure a sort key that is a union type of incompatible primitives (like `number|string`).

- Then, string-casting behavior like ` 2 > '101' ` is expected.
- See `sortingComparatorMixedNumericAsc` to try number casting first.

### Tuples

```typescript
const arr = [[1, 2, 3], [4, 5, 6]];
arr.sort(sortTupleAsc());
arr.sort(sortTupleDesc());
```

```typescript
const arr = [{id: 1, results: [1, 2, 3]}, {id: 2, results: [4, 5, 6]}];
arr.sort(sortTupleAsc(x => x.results));
arr.sort(sortTupleDesc(x => x.results));
```

### Booleans

```typescript
const arr = [{id: 3, isValid: true}, {id: 8, isValid: false}];
arr.sort(sortBoolTrueFirst(x => x.isValid));
arr.sort(sortBoolFalseFirst(x => x.isValid));
```

Or sort by computed values:

```typescript
arr.sort(sortBoolTrueFirst(x => x.id > 5)); 
```

### Nullable

Some options to handle missing/null are:

- Use `filter()` and remove nullish first
- Provide a default value with `??` in the key getter.
- Decide if null goes first or last, then apply non-null comparator.

We provide helpers for that last options and a default comparator:

```typescript
arr.sort(sortAscNullAsFirst(x => x.results));
arr.sort(sortAscNullAsLast(x => x.results));
arr.sort(sortDescNullAsFirst(x => x.results));
arr.sort(sortDescNullAsLast(x => x.results));
```

Alternatively, we provide wrappers to use your own comparator:

```typescript
// customComparator can safely assume no value will be nullish.
arr.sort(nullLast(customComparator));
arr.sort(nullFirst(customComparator));
```

## When values are on a different collection

Suppose that we have some process that compute a score form a list of items. 
Suppose those score are stored on a separate collection.
Then, there's a need to sort the original items by their score.

### A) Sync by key

#### Handle missing scores with default value

```typescript
const items = [{id: 'foo'}, {id: 'bar'}, {id: 'abc'}, {id: 'nop'}];
const scores = computeScoreMap(items);
items.sort(sortDesc((x) => scores.get(x.id) ?? 0));
```

#### Place items with missing scores at the end.

```typescript
const items = [{id: 'foo'}, {id: 'bar'}, {id: 'abc'}, {id: 'nop'}];
const scores = computeScoreMap(items);
items.sort(sortDescNullAsFirst((x) => scores.get(x.id)));
```

### B) Sync by positions

```typescript
const items = [{id: 'foo'}, {id: 'bar'}, {id: 'abc'}, {id: 'nop'}];
const scores = item.map(x => computeScore(x));
const items2 = sortByPosition(items, sortByPositionDesc(scores));
```

Return a sorted copy of the original and place item with missing value at the end.

- can apply multiple comparators `sortByPosition(items, comp1, ..., compN)`
- each comparator is bound to their own data source, synced by position

#### Keep multiple collections in sync

- When dealing with values that are synced by position, you may want to keep the sync valid after the sort operation.

```typescript
// These are in sync by position.
const items = [{id: 'foo'}, {id: 'bar'}, {id: 'abc'}, {id: 'nop'}];
const scores = item.map(x => computeScore(x));

// Compute new ordering (original are untouched)
const indexes = sortedIndexes(items, sortByPositionDesc(scores));

// These are also in sync by position.
const items2 = sortingMapSortedIndexes(items, indexes);
const scores2 = sortingMapSortedIndexes(scores, indexes);
```
