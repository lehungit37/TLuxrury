import React, { useEffect } from 'react';

import { setClientToken } from 'src/clients/http';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getMe } from 'src/redux_store/my_account/my_account_actions';

const Authentication = () => {
  const dispatch = useAppDispatch();
  const token =
    useAppSelector((state) => state.myAccountSlice.token) || localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setClientToken(token);

      dispatch(getMe());
    }
  }, [token]);

  return <React.Fragment />;
};

export default Authentication;
