import {SecurityType} from '@/enums/securityType';
import {PxHistoryMeta} from '@/types/api/px';
import {ChartDataIdentifier} from '@/types/data/chart';


export const historyMetaToIdentifier = ({contractId, interval}: PxHistoryMeta): ChartDataIdentifier => (
  `${contractId}@${interval}`
);

export const isSecurityTypeFutures = (securityType: SecurityType): boolean => {
  return securityType === 'Futures' || securityType === 'ContinuousFutures';
};

export const isSecurityTypeOptions = (securityType: SecurityType): boolean => {
  return securityType === 'Options' || securityType === 'OptionsCombo';
};
