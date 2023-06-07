import {combineReducers} from 'redux';

import accountReducer from '@/state/account/reducer';
import chartConfigReducer from '@/state/chartConfig/reducer';
import chartMetaReducer from '@/state/chartMeta/reducer';
import chartPxReducer from '@/state/chartPx/reducer/main';
import contractReducer from '@/state/contract/reducer';
import errorReducer from '@/state/error/reducer';
import optionReducer from '@/state/option/reducer';
import orderReducer from '@/state/order/reducer';
import positionReducer from '@/state/position/reducer';
import pxReducer from '@/state/px/reducer';


export const rootReducer = combineReducers({
  account: accountReducer,
  chartConfig: chartConfigReducer,
  chartPx: chartPxReducer,
  chartMeta: chartMetaReducer,
  contract: contractReducer,
  error: errorReducer,
  option: optionReducer,
  order: orderReducer,
  position: positionReducer,
  px: pxReducer,
});
