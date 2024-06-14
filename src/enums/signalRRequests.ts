export enum SignalRRequests {
  INIT_ACCOUNT_LIST = 'InitAccountList',
  INIT_ACCOUNT = 'InitAccount',
  REQUEST_PNL = 'RequestPnl',
  SUBSCRIBE_PX_TICK = 'SubscribePxTick',
  SUBSCRIBE_PX_HISTORY = 'RequestPxHistory',
  SUBSCRIBE_PX_OPTIONS = 'SubscribePxOfOptions',
  REQUEST_CONTRACT_DETAILS = 'RequestContractDetails',
  REQUEST_OPTION_DEFINITIONS = 'RequestOptionDefinitions',
  REQUEST_PX_OPTIONS = 'RequestPxOfOptions',
  CANCEL_PX_TICK = 'CancelPxTick',
  CANCEL_PX_HISTORY = 'CancelHistory',
  DISCONNECT_ACCOUNT = 'DisconnectAccount',
}
