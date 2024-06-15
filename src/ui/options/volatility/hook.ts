import React from 'react';

import {useSignalR} from '@/contexts/signalR/hook';
import {SignalRRequests} from '@/enums/signalRRequests';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {contractDispatchers} from '@/state/contract/dispatchers';
import {ContractDispatcherName} from '@/state/contract/types';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {OptionVolatilityHistoryRequest} from '@/types/api/option';
import {PxTickRequest} from '@/types/api/px';
import {ContractModel} from '@/types/data/contract';
import {OptionsVolatilityType} from '@/types/data/option';
import {OptionVolatilityActiveState, OptionVolatilityHistoryInput} from '@/ui/options/volatility/type';


export const useOptionsVolatilityHistory = () => {
  const account = useCurrentAccountSelector();
  const {connection} = useSignalR();

  const [
    state,
    setState,
  ] = React.useState<OptionVolatilityActiveState | null>(null);

  const dispatch = useDispatch();

  const subscribeHistoryPx = React.useCallback(async (input: OptionVolatilityHistoryInput) => {
    const {symbol} = input;

    if (!account) {
      return;
    }

    const response = await connection.invoke<ContractModel[]>(
      SignalRRequests.REQUEST_CONTRACT_DETAILS,
      symbol,
    );

    if (response.length === 0) {
      setState(null);
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Contract of symbol "${symbol}" not found`,
      }));
      return;
    }

    dispatch(contractDispatchers[ContractDispatcherName.RECORD_MODELS](response));

    const contract = response[0];
    const contractId = contract.id;

    const pxTickRequest: PxTickRequest = {account, contractId};
    const pxHistoryRequest: OptionVolatilityHistoryRequest = {
      account,
      symbol,
      contractId,
    };
    const [_, requestId] = await Promise.all([
      connection.send(SignalRRequests.SUBSCRIBE_PX_TICK, pxTickRequest),
      connection.invoke<number | null>(SignalRRequests.SUBSCRIBE_OPTION_VOLATILITY_HISTORY, pxHistoryRequest),
    ]);

    if (!requestId) {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Failed to request history Px data of ${symbol}`,
      }));
      return;
    }

    setState({
      input,
      type: 'iv',
      contractId,
      identifier: {
        iv: `${contractId}@iv`,
        hv: `${contractId}@hv`,
      },
    });
  }, [account]);

  return {
    state,
    setType: (type: OptionsVolatilityType) => setState((original) => {
      if (!original) {
        return null;
      }

      return {...original, type};
    }),
    subscribeHistoryPx,
  };
};
