import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/inputs/box';
import {ToggleButton} from '@/components/inputs/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {OptionsVolatilityType} from '@/types/data/option';
import {OptionVolatilityActiveState, OptionVolatilityHistoryInput} from '@/ui/options/volatility/type';


type Props = {
  state: OptionVolatilityActiveState | null,
  setType: (type: OptionsVolatilityType) => void,
  onSubmit: (input: OptionVolatilityHistoryInput) => void,
};

export const OptionsVolatilityChartInput = ({state, setType, onSubmit}: Props) => {
  const locked = state?.input;
  const type = state?.type;
  const isTypeDisabled = type == null;

  const [input, setInput] = React.useState<OptionVolatilityHistoryInput>({
    symbol: '',
  });

  return (
    <FlexForm direction="row" noFullWidth className="items-center" onSubmit={() => onSubmit(input)}>
      <InputBox
        type="text"
        value={input.symbol}
        onChange={({target}) => setInput((original): OptionVolatilityHistoryInput => ({
          ...original,
          symbol: target.value.toUpperCase(),
        }))}
        required
        className="w-20 text-sm"
        classOfBorder="border-b-amber-500 invalid:border-b-red-500"
        onKeyDown={(e) => {
          if (e.key !== 'Escape' || !locked) {
            return;
          }

          setInput(locked);
        }}
      />
      <Flex direction="row" noFullWidth className="ml-auto gap-1">
        <ToggleButton
          active={type === 'iv'}
          onClick={() => setType('iv')}
          text="IV"
          disabled={isTypeDisabled}
          getClassName={(active) => clsx(active && 'text-sky-300 hover:bg-sky-700')}
          className="enabled:hover:text-sky-300 disabled:text-slate-400"
        />
        <ToggleButton
          active={type === 'hv'}
          onClick={() => setType('hv')}
          text="HV"
          disabled={isTypeDisabled}
          getClassName={(active) => clsx(active && 'text-amber-300 hover:bg-amber-700')}
          className="enabled:hover:text-amber-300 disabled:text-slate-400"
        />
      </Flex>
    </FlexForm>
  );
};
