import merge from 'lodash/merge';

import {DeepPartial, Nullable} from '@/utils/type';


export const cloneMerge = <TSource, TOthers = TSource>(
  source: TSource,
  ...others: Nullable<DeepPartial<TOthers>>[]
): TSource => {
  // Have an empty object as the first so the merged object is cloned (and `source` won't be modified)
  // https://stackoverflow.com/a/28044419/11571888
  return merge({}, source, ...others);
};
