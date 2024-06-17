'use client';
import React from 'react';

import {clsx} from 'clsx';

import {Dropdown} from '@/components/dropdown/main';
import {InputBox} from '@/components/inputs/box';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {ProgressCombo} from '@/components/progress/combo/main';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {optionDispatchers} from '@/state/option/dispatchers';
import {useOptionChainDefinitionSelector} from '@/state/option/selector';
import {OptionDispatcherName} from '@/state/option/types';
import {OptionDefinitionRequest} from '@/types/api/option';
import {useOptionChainPxManager} from '@/ui/options/chain/hook';
import {OptionChainPxSubscribeRequestState} from '@/ui/options/chain/type';
import {CurrentUnderlyingPx} from '@/ui/options/common/underlyingPx';


const labelClassName = clsx('text-sm text-gray-300');

export const OptionChainInput = () => {
  const currentAccount = useCurrentAccountSelector();
  const definition = useOptionChainDefinitionSelector();

  const [pxRequest, setPxRequest] = React.useState<OptionChainPxSubscribeRequestState>({
    origin: 'OptionChain',
    type: 'Subscribe',
    account: '',
    expiry: [],
    strikeRangePercent: 15,
    symbol: '',
    tradingClass: '',
  });

  const {
    definitionRequest,
    setDefinitionRequest,
    requestOptionDefinitions,
    subscribeOptionPx,
    progress,
  } = useOptionChainPxManager({
    origin: 'OptionChain',
    type: 'Subscribe',
    definition,
    clearAction: optionDispatchers[OptionDispatcherName.CLEAR_OPTION_CHAIN],
  });

  // on account changed
  React.useEffect(() => {
    if (!currentAccount) {
      return;
    }

    setDefinitionRequest((original): OptionDefinitionRequest => ({
      ...original,
      account: currentAccount,
    }));
    setPxRequest((original): OptionChainPxSubscribeRequestState => ({
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
    setPxRequest((original): OptionChainPxSubscribeRequestState => {
      const updated: OptionChainPxSubscribeRequestState = {
        ...original,
        expiry: [definition.expiry[0]],
        tradingClass: definition.tradingClass[0],
        symbol: definitionRequest.symbol,
      };

      void subscribeOptionPx(updated);
      return updated;
    });
  }, [definition?.underlyingContractId]);

  return (
    <FlexForm className="gap-1" onSubmit={requestOptionDefinitions}>
      <Flex className="items-center md:flex-row">
        <Flex direction="row" noFullWidth className="mr-auto items-center gap-2">
          <InputBox
            type="text"
            value={definitionRequest.symbol}
            onChange={({target}) => setDefinitionRequest((original) => ({
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
          <label className={labelClassName} htmlFor="strike-range">
            Strike Range ± %
          </label>
          <InputBox
            type="number"
            value={pxRequest.strikeRangePercent ?? ''}
            onChange={({target}) => setPxRequest((original) => ({
              ...original,
              strikeRangePercent: target.value === '' ? null : Number(target.value),
            }))}
            required
            id="strike-range"
            min={1}
            className="w-12 text-sm"
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
                    onSelected: () => setPxRequest((original) => {
                      const updated = {
                        ...original,
                        expiry: [expiry],
                      };

                      void subscribeOptionPx(updated);
                      return updated;
                    }),
                  })),
                ] :
                []
            }
            disabled={!definition || !definition.expiry.length}
            buttonClassName="px-1.5 py-0.5 bg-gray-800 hover:bg-gray-600 text-sm disabled:bg-gray-800"
            itemClassName="text-xs"
          />
        </Flex>
      </Flex>
      {progress && <ProgressCombo progress={progress}/>}
    </FlexForm>
  );
};
