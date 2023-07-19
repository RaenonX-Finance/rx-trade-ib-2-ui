import {ChartDataRequest, LockedContractState} from '@/ui/px/type';


type GetChartInputBoxStylingOpts = {
  request: ChartDataRequest,
  locked: LockedContractState,
};

export const getChartInputBoxStyling = ({request, locked}: GetChartInputBoxStylingOpts) => {
  const requestedSymbol = locked.requested?.symbol;

  if (locked.failed) {
    return 'from-red-800 to-red-600';
  }

  if (!!requestedSymbol) {
    // Got data streaming
    if (requestedSymbol === request.symbol) {
      // Showing the data of input
      return 'from-neutral-200 to-neutral-400 text-black';
    }

    if (request.symbol === '') {
      // Pending clear
      return 'from-orange-900 to-orange-700';
    }

    // To update data source
    return 'from-yellow-900 to-yellow-700';
  }

  // No data streaming but got some input
  if (request.symbol !== '') {
    return 'from-green-900 to-green-700';
  }

  return 'from-zinc-800 to-gray-600';
};

