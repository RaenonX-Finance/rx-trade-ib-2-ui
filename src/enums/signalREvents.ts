export enum SignalREvents {
  ACCOUNT_LIST = 'AccountList',
  ACCOUNT_UPDATE = 'AccountUpdate',
  ACCOUNT_PNL_UPDATE = 'AccountPnlUpdate',
  ERROR = 'Error',
  MARGIN_INFO = 'MarginInfo',
  OPTION_CHAIN_PARAMS = 'OptionChainParams',
  ORDER_RECORD_OPEN = 'OrderRecordOpen',
  ORDER_RECORD_COMPLETED = 'OrderRecordCompleted',
  ORDER_CANCELLED = 'OrderCancelled',
  ORDER_FILLED = 'OrderFilled',
  ORDER_UPDATE = 'OrderUpdate',
  POSITION_UPDATE = 'PositionUpdate',
  POSITION_PNL_UPDATE = 'PositionPnlUpdate',
  PX_UPDATE = 'PxUpdate',
  PX_HISTORY_INIT = 'PxHistoryInit',
  PX_HISTORY_UPDATE = 'PxHistoryUpdate'
}
