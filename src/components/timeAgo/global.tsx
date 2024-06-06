import React from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';


// Initialized time ago with `en` locale as needed
TimeAgo.addDefaultLocale(en);

type Props = {
  date: Date | number,
};

export const GlobalTimeAgo = ({date}: Props) => {
  return <ReactTimeAgo date={date} updateInterval={1000} round="floor" timeStyle="round"/>;
};
