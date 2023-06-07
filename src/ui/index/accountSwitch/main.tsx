import React from 'react';

import {Dropdown} from '@/components/dropdown/main';
import {Loading} from '@/components/icons/loading/icon';
import {accountDispatchers} from '@/state/account/dispatchers';
import {useAccountListSelector, useCurrentAccountSelector} from '@/state/account/selector';
import {AccountDispatcherName} from '@/state/account/types';
import {useDispatch} from '@/state/store';


export const AccountSwitch = () => {
  const dispatch = useDispatch();
  const accountList = useAccountListSelector();
  const currentAccount = useCurrentAccountSelector();

  return (
    <Dropdown
      title="Account"
      buttonText={currentAccount || <Loading className="h-4 w-4"/>}
      items={[
        accountList.map((account, idx) => ({
          text: account,
          disabled: currentAccount === account,
          onSelected: () => dispatch(accountDispatchers[AccountDispatcherName.SET_ACCOUNT](idx)),
        })),
      ]}
      disabled={!currentAccount}
    />
  );
};
