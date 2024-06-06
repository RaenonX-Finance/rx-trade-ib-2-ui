import React from 'react';

import {clsx} from 'clsx';

import {Dropdown} from '@/components/dropdown/main';
import {useSignalR} from '@/contexts/signalR/hook';
import {SignalRRequests} from '@/enums/signalRRequests';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {optionDispatchers} from '@/state/option/dispatchers';
import {useOptionDefinitionSelector} from '@/state/option/selector';
import {OptionDispatcherName} from '@/state/option/types';
import {useDispatch} from '@/state/store';
import {InitOptionChainRequest} from '@/types/api/option';
import {OptionPxSubscribeRequestState} from '@/ui/options/chain/type';
import {CurrentUnderlyingPx} from '@/ui/options/chain/underlyingPx';
import {getErrorMessage} from '@/utils/error';


export const OptionChainParams = () => {
  const {connection} = useSignalR();
  const currentAccount = useCurrentAccountSelector();
  const dispatch = useDispatch();
  const [paramRequest, setParamRequest] = React.useState<InitOptionChainRequest>({
    account: '',
    symbol: '',
    inUseContractId: null,
    inUsePxRequestIds: [],
  });
  const [pxRequest, setPxRequest] = React.useState<OptionPxSubscribeRequestState>({
    account: '',
    expiry: '',
    strikeRange: 15,
    symbol: '',
    tradingClass: '',
  });
  const definition = useOptionDefinitionSelector();

  const submitOptionChainRequest = React.useCallback(() => {
    dispatch(optionDispatchers[OptionDispatcherName.CLEAR]());
    connection
      .send(SignalRRequests.INIT_OPTION_CHAIN, paramRequest)
      .catch((err) => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `Init option chain: ${getErrorMessage({err})}`,
        }));
      });
  }, [paramRequest]);

  const onSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitOptionChainRequest();
  }, [paramRequest]);

  // on account changed
  React.useEffect(() => {
    if (!currentAccount) {
      return;
    }

    setParamRequest((original) => ({
      ...original,
      account: currentAccount,
    }));
    setPxRequest((original) => ({
      ...original,
      account: currentAccount,
    }));
  }, [currentAccount]);

  // on param initialized
  React.useEffect(() => {
    if (!definition?.underlyingContractId) {
      return;
    }

    setParamRequest((original) => ({
      ...original,
      inUseContractId: definition.underlyingContractId,
    }));
    setPxRequest((original) => ({
      ...original,
      expiry: definition.expiry[0],
      tradingClass: definition.tradingClass[0],
      symbol: paramRequest.symbol,
    }));
  }, [definition?.underlyingContractId]);

  const labelClassName = 'text-sm text-gray-300';

  return (
    <form className="flex flex-row" onSubmit={onSubmit}>
      <div className="flex grow flex-row items-center gap-2">
        <input
          type="text"
          value={paramRequest.symbol}
          onChange={({target}) => setParamRequest((original) => ({
            ...original,
            symbol: target.value.toUpperCase(),
          }))}
          required
          className={clsx(
            'w-20 rounded-md px-1.5 py-0.5 text-xs focus-visible:outline-0',
            'bg-gradient-to-br from-amber-800 to-amber-700 invalid:from-red-800 invalid:to-red-700',
          )}
        />
        <CurrentUnderlyingPx
          underlyingContractId={definition?.underlyingContractId}
          pxRequestState={pxRequest}
          onRequestedPx={({realtimeRequestIds, contractIdPairs}) => {
            dispatch(optionDispatchers[OptionDispatcherName.UPDATE_CONTRACT_MAPPING](contractIdPairs));
            setParamRequest((original) => ({
              ...original,
              inUsePxRequestIds: realtimeRequestIds,
            }));
          }}
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        <label className={labelClassName} htmlFor="strike-range">
          Strike Range ±
        </label>
        <input
          type="number"
          value={pxRequest.strikeRange}
          onChange={({target}) => setPxRequest((original) => ({
            ...original,
            strikeRange: Number(target.value),
          }))}
          required
          id="strike-range"
          min={1}
          className={clsx(
            'w-12 rounded-md px-1.5 py-0.5 text-xs focus-visible:outline-0',
            'bg-gradient-to-br from-gray-800 to-gray-700 invalid:from-red-800 invalid:to-red-700',
          )}
        />
        <div className={labelClassName}>
          Expiry
        </div>
        <Dropdown
          title="Option Expiry"
          buttonText={pxRequest.expiry || '-'}
          items={
            definition ?
              [
                definition.expiry.map((expiry) => ({
                  text: expiry,
                  disabled: false,
                  onSelected: () => setPxRequest((original) => ({...original, expiry})),
                })),
              ] :
              []
          }
          disabled={!definition || definition.expiry.length === 0}
          buttonClassName="px-1.5 py-0.5 bg-gray-800 hover:bg-gray-600 text-xs disabled:bg-gray-800"
          itemClassName="text-xs"
        />
      </div>
      {/* For allowing form submission on enter (https://stackoverflow.com/q/4196681) */}
      <input type="submit" className="hidden"/>
    </form>
  );
};
