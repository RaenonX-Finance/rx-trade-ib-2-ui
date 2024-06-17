import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBarSingle} from '@/components/progress/bar/single';
import {ProgressComboData} from '@/components/progress/combo/type';
import {ProgressText} from '@/components/progress/text';
import {Nullable} from '@/utils/type';


type Props = {
  progress: Nullable<ProgressComboData>,
};

export const ProgressCombo = ({progress}: Props) => {
  if (!progress) {
    return null;
  }

  const {completed, total} = progress;

  return (
    <Flex className="items-end text-sm">
      <ProgressText completed={completed} total={total}/>
      <ProgressBarSingle percent={completed / total * 100} classBarHeight="h-1.5"/>
    </Flex>
  );
};
