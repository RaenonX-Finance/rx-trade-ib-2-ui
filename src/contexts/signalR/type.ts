import {HubConnection} from '@microsoft/signalr';
import {HubConnectionState} from '@microsoft/signalr/dist/esm/HubConnection';


export type SignalRConnection = {
  connection: HubConnection,
  state: HubConnectionState,
};
