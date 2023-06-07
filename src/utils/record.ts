export const isAllValueFalse = <T extends string | number | symbol>(record: Record<T, boolean>): boolean => (
  Object.values(record).every((value) => !value)
);
