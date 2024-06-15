import {OptionVolatilityHistoryRequest} from '@/types/api/option';
import {ChartDataIdentifierForVolatility} from '@/types/data/chart';
import {OptionsVolatilityType} from '@/types/data/option';
import {ContractId} from '@/types/data/px';


export type OptionVolatilityHistoryInput = Omit<OptionVolatilityHistoryRequest, 'account' | 'contractId'>;

export type OptionVolatilityActiveState = {
  input: OptionVolatilityHistoryInput,
  type: OptionsVolatilityType,
  contractId: ContractId,
  identifier: {[type in OptionsVolatilityType]: ChartDataIdentifierForVolatility},
};
