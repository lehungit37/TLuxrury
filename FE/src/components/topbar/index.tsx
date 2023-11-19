import { Avatar, Badge, Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from 'src/assets/images/logo.png';
import logoSTTTT from 'src/assets/images/logo_stttt.png';
import sitechLogo from 'src/assets/svg/sitech-logo.svg';
import { CModalIds } from 'src/constants';
import { CPath } from 'src/constants/path';

import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import theme from 'src/theme';

import ICON_TOPBAR_LIST from 'src/constants/icon_topbar_list';

import { openBoxRightContent } from 'src/redux_store/common/topbar/topbar_slice';

import { INotification } from 'src/types/notification';
import { isSTNMT, isSiTechSystem } from 'src/utils/function';
import ModalAcceptLogout from '../modal/modal_logout';
import IconButtonTooltip from '../tooltip/icon_button_tooltip';
import { useStyles } from './styles';
// import ICON_TOPBAR_LIST from 'src/constants/icon_topbar_list';
// import IconButtonTooltip from '../tooltip/icon_button_tooltip';
import { ContactSupport, ContactSupportOutlined } from '@mui/icons-material';
import config from 'src/config';

interface ITopbar {
  title: string;
}

const Topbar: React.FC<ITopbar> = ({ title }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { indexActive } = useAppSelector(({ topBarSlice }) => topBarSlice);
  const { me } = useAppSelector((state) => state.myAccountSlice);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState<{
    [x: string]: boolean;
  }>({});

  const handleOpen = (event: React.MouseEvent<HTMLElement>, name: string) => {
    setAnchorEl(event.currentTarget);
    setOpen({ [name]: true });
  };

  const handleClose = (name: string) => {
    setAnchorEl(null);
    setOpen({ [name]: false });
  };

  const stringAvatar = (name: string) => {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  };

  const handleOpenModalLogout = () => {
    dispatch(openModal({ modalId: CModalIds.logout, modalComponent: <ModalAcceptLogout /> }));
  };

  return (
    <Box
      className={classes.root}
      sx={{
        height: {
          md: isSiTechSystem ? theme.spacing(11) : theme.spacing(6),
          xs: isSiTechSystem ? theme.spacing(7) : theme.spacing(6),
        },
        px: {
          md: theme.spacing(isSiTechSystem ? 7 : 2),
          xs: theme.spacing(isSiTechSystem ? 5 : 2),
        },
      }}
    >
      <Box display="flex" flexWrap="nowrap" height="100%">
        <Box
          className={classes.logo}
          sx={{
            py: {
              md: '10px',
              xs: '6px',
            },
            height: {
              md: '100%',
              xs: '100%',
            },
          }}
        >
          {/* <img
            onClick={() => navigate(CPath.home)}
            src={isSiTechSystem ? sitechLogo : isSTNMT ? logo : logoSTTTT}
            className={classes.logoImg}
            alt="danateq.vn"
          /> */}
        </Box>

        {config.systemName !== 'SITECH' && (
          <Box
            className={classes.title}
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <Typography fontWeight={600} variant="body1" textTransform="uppercase">
              {title}
            </Typography>
          </Box>
        )}
      </Box>

      <Box className={classes.buttonAction}>
        <Box>
          <Button
            sx={{ minWidth: 'unset', marginLeft: '12px' }}
            onClick={(e) => handleOpen(e, 'userSetting')}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.error.main,
                height: '28px',
                width: '28px',
                fontSize: '18px',
              }}
              {...stringAvatar(me?.name || '')}
            ></Avatar>
          </Button>
          <Menu
            id="userSetting"
            open={Boolean(open?.userSetting)}
            anchorEl={anchorEl}
            elevation={2}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={() => handleClose('userSetting')}
          >
            <MenuItem onClick={handleOpenModalLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
