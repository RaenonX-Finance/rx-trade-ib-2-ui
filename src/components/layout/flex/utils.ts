import {clsx} from 'clsx';

import {FlexCommonProps, FlexDirection} from '@/components/layout/flex/type';
import {getLayoutClassNames} from '@/components/layout/util';


export const getFlexStyles = (direction: FlexDirection, props: FlexCommonProps) => {
  const {wrap} = props;

  return clsx(
    'flex',
    direction === 'row' ? 'flex-row' : 'flex-col',
    wrap && 'flex-wrap',
    getLayoutClassNames(props),
  );
};
