import isEqual from 'lodash/isEqual';
import {useSelector} from 'react-redux';

import {ReduxState} from '@/state/types';
import {Nullable} from '@/utils/type';


type UseArraySelectorExtractor<T> = (state: ReduxState) => Nullable<T[]>;

export const useArraySelector = <T>(selector: UseArraySelectorExtractor<T>): T[] => (
  useSelector<ReduxState, T[]>((state) => selector(state) ?? [], isEqual)
);
