export type KeysOfType<T, KT> = {
  [K in keyof T]: T[K] extends KT ? K : never
}[keyof T];

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<any> ? T[K] : DeepPartial<T[K]>;
};

export type ValueOf<T> = T[keyof T];
