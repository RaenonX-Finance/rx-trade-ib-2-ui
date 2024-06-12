import {isNotNullish, Nullable} from '@/utils/type';


export const isValidNumberToFormat = (num: Nullable<number>): num is number => isNotNullish(num) && !isNaN(num);
