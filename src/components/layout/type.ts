export type LayoutProps = {
  noFullWidth?: boolean,
  className?: string,
} & ({
  center: boolean,
  stretch?: never,
} | {
  center?: never,
  stretch: true,
} | {
  center?: undefined,
  stretch?: undefined,
});
