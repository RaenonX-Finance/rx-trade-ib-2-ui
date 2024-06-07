import {UrlObject} from 'url';

import React, {HTMLAttributeAnchorTarget} from 'react';

import Link from 'next/link';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  href: string | UrlObject,
  target?: HTMLAttributeAnchorTarget,
  scroll?: boolean,
  prefetch?: boolean,
};

const FlexLinkInternal = ({
  direction = 'row',
  noFullWidth = true,
  href,
  target,
  scroll,
  prefetch,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLAnchorElement>) => (
  <Link
    ref={ref}
    href={href}
    className={getFlexStyles(direction, {noFullWidth, ...props})}
    target={target}
    scroll={scroll}
    prefetch={prefetch}
  >
    {children}
  </Link>
);

export const FlexLink = React.forwardRef(FlexLinkInternal);
