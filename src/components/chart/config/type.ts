export type ChartConfigCheckOptions = {
  simplified: boolean,
};

export type ChartConfigEntry<G extends string> = {
  title: string,
  group: G,
  isHidden?: (opts: ChartConfigCheckOptions) => boolean,
};

export type ChartConfigUI<K extends keyof T, G extends string, T> = {
  [key in K]: ChartConfigEntry<G>
};

export type ChartConfigEntriesGroup<K extends keyof T, G extends string, T> = {
  [group in G]: {
    [key in K]: ChartConfigEntry<G>
  }
};
