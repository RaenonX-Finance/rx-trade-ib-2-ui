export type CancelPxRequest = {
  account: string,
  contractId: number,
};

export type CancelApiRequest = {
  requestId: number,
};

export type CancelRealtimeRequest = {
  requestIds: number[],
};
