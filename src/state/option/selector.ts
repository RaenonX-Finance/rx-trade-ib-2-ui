import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {useArraySelector} from '@/state/utils/hook';
import {OptionContractIdPair} from '@/types/api/option';
import {OptionDefinition} from '@/types/data/option';
import {PxOfContract} from '@/types/data/px';
import {Nullable} from '@/utils/type';


export const useOptionChainDefinitionSelector = (): Nullable<OptionDefinition> => (
  useSelector(({option}: ReduxState) => option.chain?.definition)
);

export const useOptionChainContractsSelector = (): OptionContractIdPair[] => (
  useArraySelector(({option}: ReduxState) => option.chain?.contracts)
);

export const useOptionChainRealtimeRequestIdsSelector = (): number[] => (
  useArraySelector(({option}: ReduxState) => option.chain?.realtimeRequestsIds)
);

export const useOptionGexDefinitionSelector = (): Nullable<OptionDefinition> => (
  useSelector(({option}: ReduxState) => option.gex?.definition)
);

export const useOptionGexUnderlyingPxSelector = (): Nullable<PxOfContract> => (
  useSelector(({option, px}: ReduxState) => {
    const definition = option.gex?.definition;

    if (!definition) {
      return null;
    }

    return px[definition.underlyingContractId];
  })
);

export const useOptionGexContractsSelector = (): OptionContractIdPair[] => (
  useArraySelector(({option}: ReduxState) => option.gex?.contracts)
);

export const useOptionGexRealtimeRequestIdsSelector = (): number[] => (
  useArraySelector(({option}: ReduxState) => option.gex?.realtimeRequestsIds)
);

export const useOptionGexExpectedExpirySelector = (): string[] => (
  useArraySelector(({option}: ReduxState) => option.gex?.expectedExpiry)
);
