import {HubConnection} from '@microsoft/signalr';

import {PositionUpdateMessage} from '@/types/api/positions';
import {PositionsOfAccount} from '@/types/data/positions';


export const POSITION_STATE_NAME = 'Position';

export enum PositionDispatcherName {
  POSITION_UPDATE = 'Position/PositionUpdate',
  PNL_UPDATE = 'Position/PnlUpdate',
}

export type PositionState = {[accountId in string]?: PositionsOfAccount};

export type PositionUpdateMessageForTransmit = PositionUpdateMessage & {
  signalRConnection: HubConnection,
};
