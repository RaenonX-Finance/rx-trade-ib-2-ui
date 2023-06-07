import {ContractId} from '@/types/data/px';


export type InitOptionChainRequest = {
  account: string,
  symbol: string,
  inUseContractId: ContractId | null,
  inUsePxRequestIds: number[],
};

export type OptionDefinitionMessage = {
  tradingClass: string[],
  underlyingContractId: ContractId,
  exchange: string[],
  expiry: string[],
  strike: number[]
};

export type OptionContractIdPair = {
  strike: number,
  call: number,
  put: number,
};

export type OptionPxResponse = {
  realtimeRequestIds: number[],
  contractIdPairs: OptionContractIdPair[],
};
