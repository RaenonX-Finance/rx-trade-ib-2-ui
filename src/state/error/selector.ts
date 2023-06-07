import {useSelector} from 'react-redux';

import {ErrorSelectorReturn} from '@/state/error/types';
import {ReduxState} from '@/state/types';


export const useErrorSelector = (): ErrorSelectorReturn => (
  useSelector((state: ReduxState) => state.error)
);
