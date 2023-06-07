import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {ChartDispatcherName, ChartMarketUpdatePayload} from '@/state/chartPx/types';
import {ReduxState} from '@/state/types';
import {PxHistoryMessage, PxUpdateMessage} from '@/types/api/px';
import {ChartDataIdentifier} from '@/types/data/chart';


export const chartDispatchers = {
  [ChartDispatcherName.HISTORY_INIT]: createAction<PxHistoryMessage>(ChartDispatcherName.HISTORY_INIT),
  [ChartDispatcherName.HISTORY_UPDATE]: createAction<PxHistoryMessage>(ChartDispatcherName.HISTORY_UPDATE),
  [ChartDispatcherName.UPDATE_MARKET]: createAsyncThunk<
    ChartMarketUpdatePayload,
    PxUpdateMessage,
    {state: ReduxState, rejectValue: string}
  >(
    ChartDispatcherName.UPDATE_MARKET,
    async (payload, {getState, rejectWithValue, fulfillWithValue}) => {
      const {chartPx, px} = getState();
      const {contractId, update} = payload;

      const identifiersToUpdate = Object
        .entries(chartPx.data)
        .filter(([_, data]) => data?.contractId === contractId)
        .map(([identifier]) => identifier as ChartDataIdentifier);

      if (identifiersToUpdate.length <= 0) {
        return rejectWithValue('Market price update not tracked in chart data');
      }

      const returnPayload: ChartMarketUpdatePayload = [];

      for (const identifier of identifiersToUpdate) {
        const dataInState = chartPx.data[identifier];

        if (!dataInState) {
          continue;
        }

        const {dataType} = dataInState;

        let newPx;
        if (dataType === 'Trades') {
          newPx = update.Last;
        } else if (dataType === 'MidPoint') {
          const pxOfContract = px[contractId];
          const newBid = update.Bid ?? pxOfContract?.Bid ?? NaN;
          const newAsk = update.Ask ?? pxOfContract?.Ask ?? NaN;
          const newMid = (newBid + newAsk) / 2;
          newPx = isNaN(newMid) ? undefined : newMid;
        }

        if (!newPx) {
          continue;
        }

        returnPayload.push({identifier, newPx});
      }

      return fulfillWithValue(returnPayload);
    },
  ),
};
