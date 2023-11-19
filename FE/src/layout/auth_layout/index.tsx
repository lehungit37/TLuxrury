import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import _ from 'lodash';

import ErrorBoundary from 'src/components/error_boundaries';
import { useIsRequestPending } from 'src/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/redux_store';
import { CPath } from 'src/constants';
import { useStyles } from './style';

interface IProps {
  children: JSX.Element;
}
type TLocationProps = {
  state: {
    from: Location;
  };
};

const AuthLayout = ({ children }: IProps) => {
  const classes = useStyles();
  const isLoadingGetMe = useIsRequestPending('myAccount', 'getMe');
  const { token, me } = useAppSelector((state) => state.myAccountSlice);
  const location = useLocation() as unknown as TLocationProps;
  const currentPath = location.state?.from?.pathname + location.state?.from?.search;

  if (isLoadingGetMe) {
    return (
      <Box className={classes.center}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (token && !_.isEmpty(me)) {
    let from = '';

    if (currentPath) {
      from = currentPath;
    } else {
      from = CPath.home;
    }

    return <Navigate to={from} replace />;
  }

  return (
    <ErrorBoundary>
      <Box className={classes.root}>{children}</Box>
    </ErrorBoundary>
  );
};

export default AuthLayout;
