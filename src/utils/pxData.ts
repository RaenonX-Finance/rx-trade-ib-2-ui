import {SecurityType} from '@/enums/securityType';
import {PxHistoryMeta} from '@/types/api/px';
import {ChartDataIdentifier} from '@/types/data/chart';


export const historyMetaToIdentifier = ({contractId, interval, dataType}: PxHistoryMeta): ChartDataIdentifier => {
  if (dataType === 'OptionImpliedVolatility') {
    return `${contractId}@iv`;
  }

  if (dataType === 'HistoricalVolatility') {
    return `${contractId}@hv`;
  }

  return `${contractId}@${interval}`;
};

export const isSecurityTypeFutures = (securityType: SecurityType | undefined): boolean => {
  return securityType === 'Futures' || securityType === 'ContinuousFutures';
};

export const isSecurityTypeOptions = (securityType: SecurityType | undefined): boolean => {
  return securityType === 'Options' || securityType === 'OptionsCombo';
};
