import {ChartDataRequest, ChartInputBoxStyling, LockedContractState} from '@/ui/px/type';


type GetChartInputBoxStylingOpts = {
  request: ChartDataRequest,
  locked: LockedContractState,
};

export const getChartInputBoxStyling = ({request, locked}: GetChartInputBoxStylingOpts): ChartInputBoxStyling => {
  const requestedSymbol = locked.requested?.symbol;

  if (locked.failed) {
    return 'from-red-800 to-red-600';
  }

  if (!!requestedSymbol) {
    // Got data streaming
    if (requestedSymbol === request.symbol) {
      // Showing the data of input
      return 'from-green-800 to-green-700';
    }

    if (request.symbol === '') {
      // Pending clear
      return 'from-fuchsia-800 to-fuchsia-700';
    }

    // To update data source
    return 'from-amber-800 to-amber-700';
  }

  return 'from-zinc-800 to-gray-600';
};

