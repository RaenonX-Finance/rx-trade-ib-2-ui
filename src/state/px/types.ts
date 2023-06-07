import {PxOfContract} from '@/types/data/px';


export const PX_STATE_NAME = 'Px';

export enum PxDispatcherName {
  PX_UPDATE = 'Px/PxUpdate',
}

export type PxState = {[contractId in number]?: PxOfContract};
