'use client';
import React from 'react';

import {clsx} from 'clsx';
import useResizeObserver from 'use-resize-observer';

import {Dropdown} from '@/components/dropdown/main';
import {ToggleButton} from '@/components/inputs/toggleButton';
import {useCurrentAccountSelector} from '@/state/account/selector';
import {chartConfigDispatchers} from '@/state/chartConfig/dispatchers';
import {useChartLockedRequestSelector} from '@/state/chartConfig/selector';
import {ChartConfigDispatcherName} from '@/state/chartConfig/type';
import {errorDispatchers} from '@/state/error/dispatchers';
import {ErrorDispatcherName} from '@/state/error/types';
import {useDispatch} from '@/state/store';
import {chartDataInterval} from '@/types/data/chart';
import {WindowLayout} from '@/ui/index/common/layout';
import {SimplifiedChart} from '@/ui/px/single/chart/simplified';
import {useQuoteData} from '@/ui/px/single/hook';
import {Quote} from '@/ui/px/single/quote/main';
import {getChartInputBoxStyling} from '@/ui/px/single/utils';
import {ChartDataRequest} from '@/ui/px/type';
import {getErrorMessage} from '@/utils/error';


type Props = {
  index: number,
};

export const SinglePriceQuote = ({index}: Props) => {
  const dispatch = useDispatch();

  const defaultRequest = useChartLockedRequestSelector(index);
  const account = useCurrentAccountSelector();

  const {ref, width, height} = useResizeObserver<HTMLDivElement>();
  const [request, setRequest] = React.useState<ChartDataRequest>(defaultRequest);

  const {
    chartData,
    contract,
    locked,
    lockedIdentifier,
    requestChartData,
    onKeyDown,
  } = useQuoteData({
    account,
    request,
    setRequest,
    onSetLocked: (request) => dispatch(chartConfigDispatchers[ChartConfigDispatcherName.UPDATE_LOCKED_REQUEST]({
      index, request,
    })),
  });

  // Disable inputs if it's loading OR there's a locked identifier but the chart data or its contract is not available
  const disabled = React.useMemo(
    () => lockedIdentifier && (!chartData || !contract),
    [lockedIdentifier, !!chartData, !!contract],
  );

  // Account not loaded on start, but `requestChartData` needs to have `account`,
  // therefore `account` is a dependency here
  React.useEffect(() => {
    if (defaultRequest.symbol !== '') {
      requestChartData(defaultRequest).catch((err) => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `Error on fetching the data of ${defaultRequest.symbol} on start: ${getErrorMessage({err})}`,
      })));
    }
  }, [account]);

  return (
    <WindowLayout className="flex-col gap-2" fullHeight={false}>
      <form className="flex flex-row gap-1.5" onSubmit={async (e) => {
        e.preventDefault();
        await requestChartData(request);
      }}>
        <input
          type="text"
          value={request.symbol}
          onChange={({target}) => setRequest((original) => ({
            ...original,
            symbol: target.value.toUpperCase(),
          }))}
          onKeyDown={onKeyDown}
          className={clsx(
            'w-full rounded-md bg-gradient-to-br px-1.5 py-0.5 text-sm focus-visible:outline-0',
            'disabled:text-gray-500',
            getChartInputBoxStyling({request, locked}),
          )}
          disabled={disabled}
        />
        <Dropdown
          title="Chart Data Interval"
          buttonText={request.interval}
          items={[
            chartDataInterval.map((interval) => ({
              text: interval,
              disabled: request.interval === interval,
              onSelected: async () => {
                const newRequest: ChartDataRequest = {...request, interval};
                setRequest(newRequest);

                if (request.symbol !== '') {
                  // Can't `setRequest` and call immediately because it takes some time to update `request`,
                  // so the `request` used inside `requestChartData()` will be the old input
                  await requestChartData(newRequest);
                }
              },
            })),
          ]}
          buttonClassName={clsx(
            'bg-gradient-to-br from-gray-800 to-gray-600 px-1.5 py-0.5 text-xs',
            'hover:from-indigo-700 hover:to-indigo-700',
            'disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500',
          )}
          itemsClassName="!w-24"
          itemClassName="text-xs"
          disabled={disabled}
        />
        <ToggleButton
          active={request.rthOnly}
          id={`rthOnly-${index}-${request.symbol}`}
          title={request.rthOnly ? 'RTH' : 'ETH'}
          onChange={() => setRequest((original) => ({...original, rthOnly: !request.rthOnly}))}
          className={clsx(
            'hover:text-amber-300 peer-checked:text-amber-300 peer-checked:hover:bg-amber-700',
            'peer-disabled:text-gray-500 peer-disabled:hover:bg-transparent',
          )}
          defaultTextClassName="text-gray-200"
          disabled={disabled}
        />
        <input type="submit" className="hidden"/>
      </form>
      <div className="h-28 w-full" ref={ref}>
        <SimplifiedChart
          chartData={chartData}
          account={account}
          contract={contract}
          identifier={lockedIdentifier}
          width={width}
          height={height}
        />
      </div>
      <div>
        <Quote contract={contract} lastPxFallback={chartData?.bars.at(-1)?.close}/>
      </div>
    </WindowLayout>
  );
};
