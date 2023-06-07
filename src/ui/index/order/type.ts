import {OrderState} from '@/state/order/types';


export type OrderFilter = Record<keyof OrderState, boolean>;
