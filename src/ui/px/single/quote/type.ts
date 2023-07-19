import {ContractInState} from '@/types/data/contract';
import {PxOfContract} from '@/types/data/px';


export type QuotePxProps = {
  contract: ContractInState | undefined,
  px: PxOfContract | undefined,
};
