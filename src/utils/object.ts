import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';

import {DeepPartial, Nullable} from '@/utils/type';


export const overwrite = <TSource, TOthers = TSource>(
  source: TSource,
  ...others: Nullable<DeepPartial<TOthers>>[]
): TSource => {
  // `source` as the first argument overwrites it
  // https://stackoverflow.com/a/28044419/11571888
  return merge({}, source, ...others);
};

export const overwriteIncludingArray = <TSource, TOthers = TSource>(
  source: TSource,
  other: Nullable<DeepPartial<TOthers>>,
): TSource => {
  return mergeWith({}, source, other, (_, b) => isArray(b) ? b : undefined);
};
