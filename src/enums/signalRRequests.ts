export enum SignalRRequests {
  INIT_ACCOUNT_LIST = 'InitAccountList',
  INIT_ACCOUNT = 'InitAccount',
  REQUEST_PNL = 'RequestPnl',
  REQUEST_PX_TICK = 'RequestPxTick',
  REQUEST_PX_HISTORY = 'RequestPxHistory',
  REQUEST_PX_OPTION_CHAIN = 'RequestPxOfOptionChain',
  REQUEST_CONTRACT_DETAILS = 'RequestContractDetails',
  REQUEST_OPTION_DEFINITIONS = 'RequestOptionDefinitions',
  CANCEL_PX_TICK = 'CancelPxTick',
  CANCEL_PX_HISTORY = 'CancelHistory',
  DISCONNECT_ACCOUNT = 'DisconnectAccount',
}
