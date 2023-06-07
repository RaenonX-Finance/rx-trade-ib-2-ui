import {ChartBarInUse} from '@/components/chart/type';
import {ChartDataBar} from '@/types/api/chart';
import {KeysOfType} from '@/utils/type';


export type GetPxFromBar = (bar: ChartDataBar) => number | undefined;

export type ValidKeyForLineData = KeysOfType<ChartDataBar, number | null>;

export type BarConverter = (bar: ChartDataBar) => ChartBarInUse;
