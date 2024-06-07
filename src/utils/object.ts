import merge from 'lodash/merge';

import {DeepPartial, Nullable} from '@/utils/type';


export const overwrite = <TSource, TOthers = TSource>(
  source: TSource,
  ...others: Nullable<DeepPartial<TOthers>>[]
): TSource => {
  // `source` as the first argument overwrites it
  // https://stackoverflow.com/a/28044419/11571888
  return merge(source, ...others);
};
