import {ChartConfigKeys, ChartConfigSingle} from '@/components/chart/config/ui/type';
import {ChartDataIdentifier} from '@/types/data/chart';
import {ChartDataRequest} from '@/ui/px/type';


export const CHART_CONFIG_STATE_NAME = 'ChartConfig';

export enum ChartConfigDispatcherName {
  UPDATE_CHART_CONFIG = 'ChartConfig/UpdateChartConfig',
  UPDATE_LOCKED_REQUEST = 'ChartConfig/UpdateLockedRequest',
}

export type ChartConfig = {[identifier in ChartDataIdentifier]?: ChartConfigSingle};

export type ChartLockedRequests = {[index in number]?: ChartDataRequest};

export type ConfigState = {
  layout: ChartConfig,
  locked: ChartLockedRequests,
};

export type ChartConfigUpdatePayload = {
  identifier: ChartDataIdentifier,
  configKey: ChartConfigKeys,
  value: ChartConfigSingle[ChartConfigKeys],
};

export type ChartLockedRequestUpdatePayload = {
  index: number,
  request: ChartDataRequest,
};
