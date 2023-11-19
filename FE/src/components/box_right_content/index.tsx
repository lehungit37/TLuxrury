import React, { useEffect } from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { TbPin, TbPinnedOff } from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from 'src/hooks';
import {
  closeBoxRightContent,
  changePinBoxContent,
} from 'src/redux_store/common/topbar/topbar_slice';
import theme from 'src/theme';
import LocalStorage from 'src/storage/local_storage';

import IconButtonTooltip from '../tooltip/icon_button_tooltip';
import { useStyles } from './style';

export default function BoxRightContent() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { typeContentShow, isPin } = useAppSelector(({ topBarSlice }) => topBarSlice);

  useEffect(() => {
    const pin = LocalStorage.getItem('pin');

    dispatch(changePinBoxContent(pin === 'true'));
  }, []);

  const handleCloseBoxRightContent = () => {
    dispatch(closeBoxRightContent());
  };

  const changePinBox = () => {
    dispatch(changePinBoxContent(!isPin));
    LocalStorage.setItem('pin', `${!isPin}`);
  };

  return (
    <Box className={isPin && typeContentShow === 'notification' ? classes.rootPin : classes.root}>
      <Box className={classes.header}>
        <Typography className={classes.headerTitle}>Thông báo</Typography>
        <Box display="flex">
          {typeContentShow === 'notification' &&
            (isPin ? (
              <IconButtonTooltip
                title="Bỏ ghim"
                icon={<TbPinnedOff />}
                size="medium"
                style={{ color: theme.palette.secondary.main }}
                onClick={changePinBox}
              />
            ) : (
              <IconButtonTooltip
                title="Ghim"
                icon={<TbPin />}
                size="medium"
                style={{ color: theme.palette.secondary.main }}
                onClick={changePinBox}
              />
            ))}

          <IconButton onClick={handleCloseBoxRightContent}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
