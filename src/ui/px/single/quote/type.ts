import {ContractInState} from '@/types/data/contract';
import {PxOfContract} from '@/types/data/px';
import {PartialNullable} from '@/utils/type';


export type QuotePxProps = PartialNullable<{
  contract: ContractInState,
  px: PxOfContract,
}>;
