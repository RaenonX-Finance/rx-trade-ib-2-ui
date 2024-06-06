import {SignalREvents} from '@/enums/signalREvents';
import {SignalRActionGenerator, SignalRHandlerMap} from '@/hooks/signalRConnection/type';
import {accountDispatchers} from '@/state/account/dispatchers';
import {AccountDispatcherName} from '@/state/account/types';
import {chartDispatchers} from '@/state/chartPx/dispatchers';
import {ChartDispatcherName} from '@/state/chartPx/types';
import {contractDispatchers} from '@/state/contract/dispatchers';
import {ContractDispatcherName} from '@/state/contract/types';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {optionDispatchers} from '@/state/option/dispatchers';
import {OptionDispatcherName} from '@/state/option/types';
import {orderDispatchers} from '@/state/order/dispatchers';
import {OrderDispatcherName} from '@/state/order/types';
import {positionDispatchers} from '@/state/position/dispatchers';
import {PositionDispatcherName} from '@/state/position/types';
import {pxDispatchers} from '@/state/px/dispatchers';
import {PxDispatcherName} from '@/state/px/types';
import {AccountDataUpdateMessage, AccountListMessage} from '@/types/api/account';
import {MarginInfoMessage} from '@/types/api/info';
import {OptionDefinitionMessage} from '@/types/api/option';
import {OrderCancelledMessage, OrderFilledMessage, OrderRecordMessage, OrderUpdateMessage} from '@/types/api/order';
import {AccountPnlUpdateMessage, PositionPnlUpdateMessage} from '@/types/api/pnl';
import {PositionUpdateMessage} from '@/types/api/positions';
import {PxHistoryMessage, PxUpdateMessage} from '@/types/api/px';
import {ErrorMessage} from '@/types/error';


export const SignalRHandlers: SignalRHandlerMap = {
  // ---- Server Events
  [SignalREvents.ERROR]: (message: ErrorMessage) => [
    errorDispatchers[ErrorDispatcherName.UPDATE](message),
  ],
  // ---- Account Events
  [SignalREvents.ACCOUNT_LIST]: (message: AccountListMessage) => [
    accountDispatchers[AccountDispatcherName.SET_LIST](message),
  ],
  [SignalREvents.ACCOUNT_UPDATE]: (message: AccountDataUpdateMessage) => [
    accountDispatchers[AccountDispatcherName.DATA_UPDATE](message),
  ],
  [SignalREvents.ACCOUNT_PNL_UPDATE]: (message: AccountPnlUpdateMessage) => [
    accountDispatchers[AccountDispatcherName.PNL_UPDATE](message),
  ],
  // ---- Instrument Info
  [SignalREvents.MARGIN_INFO]: (message: MarginInfoMessage) => [
    contractDispatchers[ContractDispatcherName.UPDATE_MARGIN](message),
  ],
  [SignalREvents.OPTION_CHAIN_PARAMS]: (message: OptionDefinitionMessage) => [
    optionDispatchers[OptionDispatcherName.UPDATE_DEFINITION](message),
  ],
  // ---- Orders
  [SignalREvents.ORDER_RECORD_COMPLETED]: (message: OrderRecordMessage, signalRConnection) => [
    orderDispatchers[OrderDispatcherName.RECORD_COMPLETED]({
      ...message,
      signalRConnection,
    }),
  ],
  [SignalREvents.ORDER_RECORD_OPEN]: (message: OrderRecordMessage, signalRConnection) => [
    orderDispatchers[OrderDispatcherName.RECORD_OPEN]({
      ...message,
      signalRConnection,
    }),
  ],
  [SignalREvents.ORDER_CANCELLED]: (message: OrderCancelledMessage) => [
    orderDispatchers[OrderDispatcherName.MARK_CANCELLED](message),
  ],
  [SignalREvents.ORDER_FILLED]: (message: OrderFilledMessage) => [
    orderDispatchers[OrderDispatcherName.MARK_FILLED](message),
  ],
  [SignalREvents.ORDER_UPDATE]: (message: OrderUpdateMessage) => [
    orderDispatchers[OrderDispatcherName.UPDATE_STATUS](message),
  ],
  // ---- Positions
  [SignalREvents.POSITION_UPDATE]: (message: PositionUpdateMessage, signalRConnection) => [
    positionDispatchers[PositionDispatcherName.POSITION_UPDATE]({
      ...message,
      signalRConnection,
    }),
  ],
  [SignalREvents.POSITION_PNL_UPDATE]: (message: PositionPnlUpdateMessage) => [
    positionDispatchers[PositionDispatcherName.PNL_UPDATE](message),
  ],
  // ---- Price Quoting
  [SignalREvents.PX_UPDATE]: (message: PxUpdateMessage) => {
    const {Last, Bid, Ask} = message.update;
    const actions: ReturnType<SignalRActionGenerator> = [pxDispatchers[PxDispatcherName.PX_UPDATE](message)];

    // `ChartDispatcherName.UPDATE_MARKET` only care about Bid/Ask/Last
    if (!!Last || !!Bid || !!Ask) {
      actions.push(chartDispatchers[ChartDispatcherName.UPDATE_MARKET](message));
    }

    return actions;
  },
  [SignalREvents.PX_HISTORY_INIT]: (message: PxHistoryMessage) => [
    chartDispatchers[ChartDispatcherName.HISTORY_INIT](message),
  ],
  [SignalREvents.PX_HISTORY_UPDATE]: (message: PxHistoryMessage) => [
    chartDispatchers[ChartDispatcherName.HISTORY_UPDATE](message),
  ],
};
