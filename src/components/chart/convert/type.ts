import {ChartBarInUse} from '@/components/chart/type';
import {ChartDataBarWithData} from '@/types/api/chart';
import {KeysOfType} from '@/utils/type';


export type GetPxFromBar = (bar: ChartDataBarWithData) => number | undefined;

export type ValidKeyForLineData = KeysOfType<ChartDataBarWithData, number>;

export type BarConverter = (bar: ChartDataBarWithData) => ChartBarInUse;
