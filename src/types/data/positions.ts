export type PositionData = {
  dailyPnl: number | null,
  unrealizedPnl: number,
  realizedPnl: number,
  quantity: number,
  avgPx: number,
  costBasis: number,
  marketValue: number,
};

export type PositionsOfAccount = {[contractId in number]?: PositionData};
