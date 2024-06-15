import React from 'react';

import {useSignalR} from '@/contexts/signalR/hook';
import {SignalRRequests} from '@/enums/signalRRequests';
import {useIsSymbolLockedSelected} from '@/state/chartConfig/selector';
import {useChartDataSelector} from '@/state/chartPx/selector';
import {contractDispatchers} from '@/state/contract/dispatchers';
import {useContractSelector} from '@/state/contract/selector';
import {ContractDispatcherName} from '@/state/contract/types';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useHasPositionSelector} from '@/state/position/selector';
import {useDispatch} from '@/state/store';
import {ChartHistoryPxRequest} from '@/types/api/chart';
import {CancelApiRequest, CancelPxRequest} from '@/types/api/cleanup';
import {PxTickRequest} from '@/types/api/px';
import {ChartDataIdentifier} from '@/types/data/chart';
import {ContractModel} from '@/types/data/contract';
import {ChartDataRequest, LockedContractState} from '@/ui/px/type';


type UseQuoteDataOpts = {
  account: string | undefined,
  request: ChartDataRequest,
  setRequest: React.Dispatch<React.SetStateAction<ChartDataRequest>>,
  onSetLocked: (locked: ChartDataRequest) => void,
};

export const useQuoteData = ({account, request, setRequest, onSetLocked}: UseQuoteDataOpts) => {
  const {connection} = useSignalR();
  const dispatch = useDispatch();

  const [locked, setLocked] = React.useState<LockedContractState>({
    contractId: null,
    requested: null,
    failed: false,
  });

  const lockedIdentifier: ChartDataIdentifier | undefined = (
    !!locked.contractId && !!locked.requested ?
      `${locked.contractId}@${locked.requested.interval}` :
      undefined
  );

  const contract = useContractSelector(locked.contractId);
  const chartData = useChartDataSelector(lockedIdentifier);
  const hasPosition = useHasPositionSelector(account, contract?.id);
  const isSymbolLocked = useIsSymbolLockedSelected(locked.requested?.symbol);

  const requestChartData = React.useCallback(async (request: ChartDataRequest) => {
    if (!account) {
      return;
    }

    // Cancel locked request
    if (!hasPosition && !isSymbolLocked && locked.contractId && locked.requested) {
      const cancelRequests = [
        connection.send(
          SignalRRequests.CANCEL_PX_HISTORY,
          {requestId: locked.requested.requestId} satisfies CancelApiRequest,
        ).catch(() => errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Failed to cancel history Px of contract [${locked.contractId}]`,
        })),
      ];

      // Only cancel symbol if it's not locked
      if (!isSymbolLocked) {
        cancelRequests.push(connection.send(
          SignalRRequests.CANCEL_PX_TICK,
          {
            account,
            contractId: locked.contractId,
          } satisfies CancelPxRequest,
        ));
      }

      await Promise.all(cancelRequests);
    }

    // Clear locked request if input is empty
    if (request.symbol === '') {
      // If symbol not specified, cancel the px subscription if no position
      setLocked({
        contractId: null,
        requested: null,
        failed: false,
      });
      onSetLocked(request);
      return;
    }

    const response = await connection.invoke<ContractModel[]>(
      SignalRRequests.REQUEST_CONTRACT_DETAILS,
      request.symbol,
    );

    if (response.length === 0) {
      setLocked({
        contractId: null,
        requested: null,
        failed: true,
      });
      onSetLocked(request);
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Contract of symbol "${request.symbol}" not found`,
      }));
      return;
    }

    dispatch(contractDispatchers[ContractDispatcherName.RECORD_MODELS](response));

    const contract = response[0];
    const contractId = contract.id;

    const pxTickRequest: PxTickRequest = {account, contractId};
    const pxHistoryRequest: ChartHistoryPxRequest = {
      ...request,
      account,
      contractId,
      exchange: contract.exchange,
    };
    const [_, requestId] = await Promise.all([
      connection.send(SignalRRequests.SUBSCRIBE_PX_TICK, pxTickRequest),
      connection.invoke<number | null>(SignalRRequests.SUBSCRIBE_PX_HISTORY, pxHistoryRequest),
    ]);

    if (!requestId) {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Failed to request history Px data of ${request.symbol}`,
      }));
      return;
    }

    setLocked({
      contractId,
      requested: {
        ...request,
        requestId,
      },
      failed: false,
    });
    onSetLocked(request);
  }, [connection, account, request, hasPosition, isSymbolLocked]);

  const onKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Escape' || !locked.requested) {
      return;
    }

    setRequest(locked.requested);
  }, [locked]);

  return {chartData, contract, locked, lockedIdentifier, requestChartData, onKeyDown};
};
