export enum SignalRRequests {
  INIT_ACCOUNT_LIST = 'InitAccountList',
  INIT_ACCOUNT = 'InitAccount',
  INIT_OPTION_CHAIN = 'InitOptionChain',
  REQUEST_PNL = 'RequestPnl',
  REQUEST_PX_TICK = 'RequestPxTick',
  CANCEL_PX_TICK = 'CancelPxTick',
  REQUEST_PX_HISTORY = 'RequestPxHistory',
  CANCEL_PX_HISTORY = 'CancelHistory',
  REQUEST_PX_OPTION_CHAIN = 'RequestPxOfOptionChain',
  REQUEST_CONTRACT_DETAILS = 'RequestContractDetails',
  DISCONNECT_ACCOUNT = 'DisconnectAccount',
}
