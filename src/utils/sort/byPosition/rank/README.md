## Sort by Rank

"Count" of items "better" than current value.

- Synced by position with reference array.
- Similar to sorted indexes, but with post-processing for duplicates.
- Ranks start at 1. (indexes start at 0)

- There's different conventions on how to assign a numerical value to a rank.
  - **Min rank**: count items STRICTLY BETTER than current. (gap after duplicates)
  - **Max rank**: count items BETTER OR EQUAL to current. (gap before duplicates)
  - **Dense rank**: count DISTINCT items better or equal to current (no gap)
  - **Avg rank**: locate ranks in the middle of the duplicated sequence
    (average between min and max, equal gap on each side)

- `compareFn(a,b)` defines the sorting order, and what is a duplicate.
  - We use convention than better items are earlier in the list.

- Convention is selected using `rankFn()`.
  - Implementations for `dense`, `min`, `max`, and `avg` rank value, are provided.
  - See type definition for parameter explanation.

- Missing values are handled at the comparator level

----------------------------

#### Credits

The different conventions for rank are lifted from here:
https://github.com/stdlib-js/stats-ranks

Aside from the convention and their names, implementation is distinct.
They needed to build a sorting utilities to implement `ranks()`, but we have our own.
