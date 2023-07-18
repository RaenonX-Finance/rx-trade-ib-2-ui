import {ChartDataIdentifier} from '@/types/data/chart';
import {ContractId} from '@/types/data/px';


export const getContractIdFromIdentifier = (identifier: ChartDataIdentifier): ContractId => {
  const [contractId] = identifier.split('@', 1);

  return Number(contractId);
};

export const getDigitsFromMinTick = (minTick: number): number => {
  const [_, decimals] = minTick.toString().split('.', 2);

  // `decimals` could be undefined if there's no decimal in `minTick`
  return decimals?.length ?? 0;
};
