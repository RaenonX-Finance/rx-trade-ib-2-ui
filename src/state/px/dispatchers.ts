import {createAction} from '@reduxjs/toolkit';

import {PxDispatcherName} from '@/state/px/types';
import {PxUpdateMessage} from '@/types/api/px';


export const pxDispatchers = {
  [PxDispatcherName.PX_UPDATE]: createAction<PxUpdateMessage>(PxDispatcherName.PX_UPDATE),
};
