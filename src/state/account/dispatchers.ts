import {createAction} from '@reduxjs/toolkit';

import {AccountDispatcherName} from '@/state/account/types';
import {AccountDataUpdateMessage, AccountListMessage} from '@/types/api/account';
import {AccountPnlUpdateMessage} from '@/types/api/pnl';


export const accountDispatchers = {
  [AccountDispatcherName.DATA_UPDATE]: createAction<AccountDataUpdateMessage>(AccountDispatcherName.DATA_UPDATE),
  [AccountDispatcherName.PNL_UPDATE]: createAction<AccountPnlUpdateMessage>(AccountDispatcherName.PNL_UPDATE),
  [AccountDispatcherName.SET_LIST]: createAction<AccountListMessage>(AccountDispatcherName.SET_LIST),
  [AccountDispatcherName.SET_ACCOUNT]: createAction<number>(AccountDispatcherName.SET_ACCOUNT),
};
