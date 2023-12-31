import React from 'react';

import {askClassName, bidClassName} from '@/components/colors/const';
import {SignalRContext} from '@/contexts/signalR/main';
import {useOptionDefinitionSelector} from '@/state/option/selector';
import {usePxSelector} from '@/state/px/selector';
import {OptionDefinitionMessage, OptionPxResponse} from '@/types/api/option';
import {OptionPxSubscribeRequestState} from '@/ui/options/chain/type';
import {useSendOptionPxRequest} from '@/ui/options/chain/utils';
import {getDailyChange} from '@/utils/calc/px';
import {changeInfoToString} from '@/utils/math';
import {classNames} from '@/utils/react';


type Props = {
  underlyingContractId: OptionDefinitionMessage['underlyingContractId'] | undefined,
  pxRequestState: OptionPxSubscribeRequestState,
  onRequestedPx: (response: OptionPxResponse) => void,
};

export const CurrentUnderlyingPx = ({underlyingContractId, pxRequestState, onRequestedPx}: Props) => {
  const connection = React.useContext(SignalRContext);
  const px = usePxSelector(underlyingContractId);
  const definition = useOptionDefinitionSelector();

  const sendOptionPxInitRequest = useSendOptionPxRequest({
    connection,
    px,
    pxRequestState,
    definition,
    onRequestedPx,
  });

  const commonClasses = 'w-12 self-center rounded-md text-right text-sm';
  const change = getDailyChange(px);

  React.useEffect(() => {
    sendOptionPxInitRequest();
  }, [connection, definition, !!px?.Mark, pxRequestState]);

  return (
    <>
      <div className={classNames(commonClasses, bidClassName)}>{px?.Bid?.toFixed(2) ?? '-'}</div>
      <div className={classNames(commonClasses, askClassName)}>{px?.Ask?.toFixed(2) ?? '-'}</div>
      <div className={classNames(commonClasses)}>{px?.Last?.toFixed(2) ?? '-'}</div>
      <div className={classNames(commonClasses, 'w-28', change?.textClass)}>
        {changeInfoToString(change)}
      </div>
    </>
  );
};
