import {HistoryDataType} from '@/enums/historyDataType';
import {ChartDataBarWithData} from '@/types/api/chart';
import {OptionsVolatilityType} from '@/types/data/option';
import {ContractId} from '@/types/data/px';


export const chartDataInterval = [
  '1s',
  '5s',
  '15s',
  '30s',
  '1m',
  '2m',
  '3m',
  '5m',
  '15m',
  '30m',
  '1h',
  '1d',
] as const;

export type ChartDataInterval = typeof chartDataInterval[number];

export type ChartDataIdentifierForVolatility = `${ContractId}@${OptionsVolatilityType}`;

export type ChartDataIdentifier = `${ContractId}@${ChartDataInterval}` | ChartDataIdentifierForVolatility;

export type ChartData = {
  bars: ChartDataBarWithData[],
  dataType: HistoryDataType,
  contractId: ContractId,
};

export type ChartDataMap = {[identifier in ChartDataIdentifier]?: ChartData};
