import {ContractState} from '@/state/contract/types';
import {ContractModel} from '@/types/data/contract';
import {getDigitsFromMinTick} from '@/utils/chart';


export const insertContract = (originalState: ContractState, contractModel: ContractModel): ContractState => ({
  ...originalState,
  [contractModel.id]: {
    ...contractModel,
    initialMargin: null,
    maintenanceMargin: null,
    digits: getDigitsFromMinTick(contractModel?.details?.minTick ?? 0.01),
  },
});

export const mergeContract = (originalState: ContractState, contractModel: ContractModel): ContractState => {
  const {id} = contractModel;
  const contractInState = originalState[id];

  if (!contractInState) {
    return insertContract(originalState, contractModel);
  }

  return {
    ...originalState,
    [contractModel.id]: {
      ...contractInState,
      ...contractModel,
      digits: getDigitsFromMinTick(contractModel?.details?.minTick ?? 0.01),
    },
  };
};
