import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/inputs/box';
import {ToggleButton} from '@/components/inputs/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {ProgressCombo} from '@/components/progress/combo/main';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {optionDispatchers} from '@/state/option/dispatchers';
import {useOptionGexDefinitionSelector, useOptionGexRealtimeRequestIdsSelector} from '@/state/option/selector';
import {OptionDispatcherName} from '@/state/option/types';
import {OptionDefinitionRequest} from '@/types/api/option';
import {optionChainDataSource} from '@/types/data/option';
import {CurrentUnderlyingPx} from '@/ui/options/common/underlyingPx';
import {useOptionGexPxManager} from '@/ui/options/gex/hook';
import {OptionGexPxSubscribeRequestState} from '@/ui/options/gex/type';


type Props = {
  onUnderlyingContractUpdated: (request: OptionGexPxSubscribeRequestState) => void,
};

export const OptionsGexInput = ({onUnderlyingContractUpdated}: Props) => {
  const currentAccount = useCurrentAccountSelector();
  const definition = useOptionGexDefinitionSelector();
  const gexRealtimeRequestIds = useOptionGexRealtimeRequestIdsSelector();

  const [pxRequest, setPxRequest] = React.useState<OptionGexPxSubscribeRequestState>({
    origin: 'GammaExposure',
    type: 'OneTime',
    account: '',
    symbol: '',
    tradingClass: '',
    expiryMaxDays: 90,
    rangePercent: 25,
    spotPxOverride: null,
    source: 'api',
  });

  const {
    definitionRequest,
    setDefinitionRequest,
    requestOptionDefinitions,
    subscribeOptionPx,
    progress,
  } = useOptionGexPxManager({
    origin: 'GammaExposure',
    type: 'OneTime',
    definition,
    clearAction: optionDispatchers[OptionDispatcherName.CLEAR_OPTION_GEX],
  });

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

      if (original.source === 'ibkr') {
        void subscribeOptionPx({
          payload: updated,
          realtimeRequestIdsToCancel: gexRealtimeRequestIds,
        });
      }
      return updated;
    });
  }, [definition?.underlyingContractId]);

  return (
    <FlexForm className="items-center gap-1.5 rounded-lg bg-slate-500/20 p-2" onSubmit={async () => {
      onUnderlyingContractUpdated({
        ...pxRequest,
        symbol: definitionRequest.symbol,
      });
      await requestOptionDefinitions(gexRealtimeRequestIds);
    }}>
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
        <label className="text-sm text-gray-300" htmlFor="strike-range">
          Range (%)
        </label>
        <InputBox
          type="number"
          value={pxRequest.rangePercent ?? ''}
          onChange={({target}) => setPxRequest((original) => ({
            ...original,
            rangePercent: target.value === '' ? null : Number(target.value),
          }))}
          required
          id="strike-range"
          min={1}
          className="w-12 text-sm"
        />
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
        <label className="text-sm text-gray-300" htmlFor="max-expiry">
          Spot Px Override
        </label>
        <InputBox
          type="number"
          value={pxRequest.spotPxOverride ?? ''}
          onChange={({target}) => setPxRequest((original) => ({
            ...original,
            spotPxOverride: target.value === '' ? null : Number(target.value),
          }))}
          required
          id="spot-px"
          min={1}
          className="w-20 text-sm"
        />
      </Flex>
      <Flex direction="row" center wrap className="gap-1.5">
        {optionChainDataSource.map((source) => (
          <ToggleButton
            key={source}
            active={pxRequest.source === source}
            text={source.toUpperCase()}
            onClick={() => setPxRequest((original) => ({...original, source}))}
            getClassName={(active) => clsx(active ? 'text-green-400' : 'text-red-400')}
            classOfText="text-xs"
            className="ring-1 ring-inset ring-slate-600 hover:bg-slate-700"
          />
        ))}
      </Flex>
      {progress && <ProgressCombo progress={progress}/>}
    </FlexForm>
  );
};
