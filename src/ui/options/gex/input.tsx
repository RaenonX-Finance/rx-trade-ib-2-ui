'use client';
import React from 'react';

import {InputBox} from '@/components/inputs/box';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {useSignalR} from '@/contexts/signalR/hook';
import {SignalRRequests} from '@/enums/signalRRequests';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {optionDispatchers} from '@/state/option/dispatchers';
import {useOptionGexDefinitionSelector} from '@/state/option/selector';
import {OptionDispatcherName} from '@/state/option/types';
import {useDispatch} from '@/state/store';
import {OptionDefinitionRequest} from '@/types/api/option';
import {CurrentUnderlyingPx} from '@/ui/options/common/underlyingPx';
import {useOptionGexPxSubscriber} from '@/ui/options/gex/hook';
import {OptionGexPxSubscribeRequestState} from '@/ui/options/gex/type';
import {getErrorMessage} from '@/utils/error';


export const OptionsGexInput = () => {
  const {connection} = useSignalR();
  const currentAccount = useCurrentAccountSelector();
  const definition = useOptionGexDefinitionSelector();

  const dispatch = useDispatch();

  const [definitionRequest, setDefinitionRequest] = React.useState<OptionDefinitionRequest>({
    origin: 'GammaExposure',
    account: '',
    symbol: '',
    inUseContractId: null,
    inUsePxRequestIds: [],
  });
  const [pxRequest, setPxRequest] = React.useState<OptionGexPxSubscribeRequestState>({
    origin: 'GammaExposure',
    account: '',
    symbol: '',
    tradingClass: '',
    expiryMaxDays: 120,
  });

  const subscribeOptionPx = useOptionGexPxSubscriber({
    definition,
    onRequestedPx: (response) => {
      const {realtimeRequestIds} = response;

      // `onRequestPx()` could get called multiple times on a single `definition` change,
      // therefore concatenating `inUsePxRequestIds` instead of overwriting
      dispatch(optionDispatchers[OptionDispatcherName.UPDATE_CONTRACTS](response));
      setDefinitionRequest((original) => ({
        ...original,
        inUsePxRequestIds: [...original.inUsePxRequestIds, ...realtimeRequestIds],
      }));
    },
  });

  const onSubmit = React.useCallback(() => {
    dispatch(optionDispatchers[OptionDispatcherName.CLEAR_OPTION_GEX]());
    connection
      .send(SignalRRequests.REQUEST_OPTION_DEFINITIONS, definitionRequest)
      .catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Init option chain: ${getErrorMessage({err})}`,
      })));
    setDefinitionRequest((original) => ({
      ...original,
      inUsePxRequestIds: [],
    }));
  }, [definitionRequest]);

  // on account changed
  React.useEffect(() => {
    if (!currentAccount) {
      return;
    }

    setDefinitionRequest((original) => ({
      ...original,
      account: currentAccount,
    }));
    setPxRequest((original) => ({
      ...original,
      account: currentAccount,
    }));
  }, [currentAccount]);

  // on definition maybe loaded
  React.useEffect(() => {
    if (!definition?.underlyingContractId) {
      return;
    }

    setDefinitionRequest((original): OptionDefinitionRequest => ({
      ...original,
      inUseContractId: definition.underlyingContractId,
    }));
    setPxRequest((original): OptionGexPxSubscribeRequestState => {
      const updated: OptionGexPxSubscribeRequestState = {
        ...original,
        tradingClass: definition.tradingClass[0],
        symbol: definitionRequest.symbol,
      };

      subscribeOptionPx(updated);
      return updated;
    });
  }, [definition?.underlyingContractId]);

  return (
    <FlexForm direction="row" className="items-center" onSubmit={onSubmit}>
      <Flex direction="row" noFullWidth className="mr-auto items-center gap-2">
        <InputBox
          type="text"
          value={definitionRequest.symbol}
          onChange={({target}) => setDefinitionRequest((original): OptionDefinitionRequest => ({
            ...original,
            symbol: target.value.toUpperCase(),
          }))}
          required
          className="w-20 text-sm"
          classOfBorder="border-b-amber-500 invalid:border-b-red-500"
        />
        <CurrentUnderlyingPx definition={definition}/>
      </Flex>
      <Flex direction="row" noFullWidth className="items-center gap-1.5">
        <label className="text-sm text-gray-300" htmlFor="max-expiry">
          Max Expiry Days
        </label>
        <InputBox
          type="number"
          value={pxRequest.expiryMaxDays ?? ''}
          onChange={({target}) => setPxRequest((original) => ({
            ...original,
            expiryMaxDays: target.value === '' ? null : Number(target.value),
          }))}
          required
          id="max-expiry"
          min={1}
          className="w-12 text-sm"
        />
      </Flex>
      {/* For allowing form submission on enter (https://stackoverflow.com/q/4196681) */}
      <input type="submit" className="hidden"/>
    </FlexForm>
  );
};
