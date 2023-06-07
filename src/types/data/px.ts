import {PxTick} from '@/enums/pxTick';


export type PxOfContract = {[tickType in PxTick]?: number};

export type ContractId = number;
