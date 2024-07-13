import {OptionDefinitionMessage} from '@/types/api/option';


export type OptionDefinition = OptionDefinitionMessage;

export type OptionsVolatilityType = 'hv' | 'iv';

export const optionChainDataSource = [
  'api',
  'ibkr',
] as const;

export type OptionChainDataSource = typeof optionChainDataSource[number];
