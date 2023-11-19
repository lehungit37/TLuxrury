import React, { useState, useEffect, useRef } from 'react';
import { Box, Divider } from '@mui/material';
import ErrorBoundary from 'src/components/error_boundaries';
import { useStyles } from './style';
import Topbar from 'src/components/topbar';
import { CPath, CRouteList } from 'src/constants';
import Sidebar from 'src/components/sidebar';
import SidebarSmall from 'src/components/sidebar_small';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import BoxRightContent from 'src/components/box_right_content';
import websocket from 'src/clients/websocket';

import toast from 'react-hot-toast';
import { INotificationLevel } from 'src/types/notification';
import { soundList } from 'src/constants/media';
import _ from 'lodash';
import { closeBoxRightContent } from 'src/redux_store/common/topbar/topbar_slice';

interface IProps {
  children: JSX.Element;
}

const AdminLayout = (props: IProps) => {
  const classes = useStyles();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { token, me } = useAppSelector((state) => state.myAccountSlice);
  const { openRightContent, typeContentShow } = useAppSelector((state) => state.topBarSlice);

  const [count, setCount] = useState(0);
  const [tabHasFocus, setTabHasFocus] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const getTitle = () => {
    if (!location.pathname) return '';
    const path = location.pathname;
    const route = CRouteList.find((route) => route.path === path);
    const title = route?.name || '';

    return title;
  };

  if (!token) {
    return <Navigate to={CPath.login} state={{ from: location }} replace />;
  }

  // useEffect(() => {
  //   if (token) {
  //     websocket.initialize(token);
  //   }
  // }, [token]);

  // useEffect(() => {
  //   return () => {
  //     if (websocket) {
  //       websocket.disconnect();
  //     }
  //     dispatch(closeBoxRightContent());
  //   };
  // }, []);

  const handleFocus = () => {
    setTabHasFocus(true);
  };

  const handleBlur = () => {
    setTabHasFocus(false);
  };

  useEffect(() => {
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Box className={classes.root}>
        <Topbar title={getTitle()} />
        <Divider />
        <Box className={classes.container}>
          <Sidebar />

          <Divider orientation="vertical" />
          <Box className={classes.wrapper}>
            <Box className={classes.page}>{props.children}</Box>
            {openRightContent && <BoxRightContent />}
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default AdminLayout;
