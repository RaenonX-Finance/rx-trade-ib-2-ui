'use client';
import React from 'react';

import {GlobalTimeAgo} from '@/components/timeAgo/global';
import {useAccountDataSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {WindowLayout} from '@/ui/index/common/layout';
import {ExposurePercent} from '@/ui/index/summary/dataCell/exposure';
import {SummaryValueCell} from '@/ui/index/summary/valueCell';
import {SummaryValueCellFromData} from '@/ui/index/summary/valueCellFromData';


export const AccountSummary = () => {
  const currentAccount = useCurrentAccountSelector();
  const accountData = useAccountDataSelector(currentAccount);

  return (
    <WindowLayout>
      <div className="flex flex-col gap-2 self-center text-center">
        <div>
          <SummaryValueCellFromData data={accountData} dataKey="AvailableFunds"/>
        </div>
        <div>
          <SummaryValueCellFromData data={accountData} dataKey="NetLiquidation"/>
        </div>
        <div>
          <SummaryValueCell title="Exposure" value={<ExposurePercent/>}/>
        </div>
        <div>
          <SummaryValueCellFromData data={accountData} dataKey="DayTradesRemaining"/>
        </div>
        <div className="text-right text-xs">
          {
            accountData ?
              <GlobalTimeAgo date={accountData.lastUpdatedEpochMs}/> :
              <>Not Updated</>
          }
        </div>
      </div>
    </WindowLayout>
  );
};
