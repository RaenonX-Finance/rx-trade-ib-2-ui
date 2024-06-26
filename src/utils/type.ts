export type KeysOfType<T, KT> = {
  [K in keyof T]: T[K] extends KT ? K : never
}[keyof T];

export type DeepPartial<T> = T extends object ? {[P in keyof T]?: DeepPartial<T[P]>} : T;

export type ValueOf<T> = T[keyof T];

export type Nullable<T> = T | null | undefined;

export type PartialNullable<T> = {[P in keyof T]?: Nullable<T[P]>};

export const isNotNullish = <TValue>(value: TValue | null | undefined): value is TValue => {
  if (value === null || value === undefined) {
    return false;
  }

  // noinspection BadExpressionStatementJS
  value satisfies TValue;
  return true;
};
