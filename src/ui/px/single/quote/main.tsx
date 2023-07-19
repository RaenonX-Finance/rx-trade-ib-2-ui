import React from 'react';

import {usePxSelector} from '@/state/px/selector';
import {ContractInState} from '@/types/data/contract';
import {QuoteDailyChange} from '@/ui/px/single/quote/change';
import {QuoteCurrentPx} from '@/ui/px/single/quote/currentPx';
import {QuotePositionStats} from '@/ui/px/single/quote/position';


type Props = {
  contract: ContractInState | undefined,
  lastPxFallback: number | undefined,
};

export const Quote = ({contract, lastPxFallback}: Props) => {
  const px = usePxSelector(contract?.id);

  return (
    <div className="flex flex-col gap-1 text-sm leading-none">
      <div className="flex flex-row items-end">
        <div>
          <QuoteCurrentPx contract={contract} px={px} lastPxFallback={lastPxFallback}/>
        </div>
        <div className="ml-auto">
          <QuoteDailyChange contract={contract} px={px}/>
        </div>
      </div>
      <div className="text-end text-xs leading-none">
        <QuotePositionStats contract={contract}/>
      </div>
    </div>
  );
};
