import {ContractId} from '@/types/data/px';


export type OptionPxRequestOrigin = 'OptionChain' | 'GammaExposure';

export type OptionPxRequestType = 'OneTime' | 'Subscribe';

export type OptionDefinitionRequest = {
  origin: OptionPxRequestOrigin,
  account: string,
  symbol: string,
  inUseContractId: ContractId | null,
};

export type OptionDefinitionMessage = {
  origin: OptionPxRequestOrigin,
  tradingClass: string[],
  underlyingContractId: ContractId,
  exchange: string[],
  expiry: string[],
  strike: number[],
};

export type OptionContractIdPair = {
  expiry: string,
  strike: number,
  call: number,
  put: number,
};

export type OptionPxResponse = {
  origin: OptionPxRequestOrigin,
  realtimeRequestIds: number[],
  contractIdPairs: OptionContractIdPair[],
};

export type OptionVolatilityHistoryRequest = {
  account: string,
  symbol: string,
  contractId: number,
};
