import { Menu, SettingsOutlined } from '@mui/icons-material';
import { Box, Divider, MenuItem, Tooltip } from '@mui/material';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { CMenuList, checkPermissionExpanded } from 'src/constants';
import { useAppSelector } from 'src/hooks';
import { IMenuRoute } from 'src/types/route';
import { checkMenuActive, checkShowMenu } from 'src/utils/function';
import ExpandSidebar from '../expand_sidebar';
import { ButtonMobile, ButtonTop, MenuMobile, useStyles } from './styles';

interface ISidebarSmall {
  toggleSidebar: () => void;
}

const SidebarSmall = ({ toggleSidebar }: ISidebarSmall) => {
  const { me } = useAppSelector((state) => state.myAccountSlice);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElExpandSetting, setAnchorElExpandSetting] =
    React.useState<HTMLButtonElement | null>(null);

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

  const handleClickExpandSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElExpandSetting(event.currentTarget);
  };

  const handleCloseExpandSetting = () => {
    setAnchorElExpandSetting(null);
  };

  const renderIcon = (menu: IMenuRoute) => {
    let Icon;

    if (location.pathname === menu.path) {
      Icon = menu.activeIcon;
    } else {
      Icon = menu.icon;
    }

    return <Icon color={checkMenuActive(menu.path, location) ? 'primary' : 'default'} />;
  };

  const renderMenuList = () => {
    return CMenuList.map((menu, index) => {
      if (!checkShowMenu(menu, me)) return;

      if (menu.isExpandSetting) return;
      return (
        <React.Fragment key={index}>
          <Box className={classes.listItem} onClick={(e) => handleOpen(e, menu.path)}>
            <Tooltip title={menu.title} arrow placement="right">
              <ButtonMobile
                onClick={() => navigate(menu.path)}
                className={classNames({
                  active:
                    checkMenuActive(menu.path, location) ||
                    !_.isEmpty(menu?.subMenu?.find((item) => checkMenuActive(item.path, location))),
                })}
              >
                {renderIcon(menu)}
              </ButtonMobile>
            </Tooltip>
          </Box>
          {menu?.subMenu && (
            <MenuMobile
              id={menu.path}
              open={Boolean(open?.[menu.path])}
              anchorEl={anchorEl}
              elevation={2}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => handleClose(menu.path)}
            >
              {menu.subMenu?.map((item, index) => (
                <MenuItem
                  className={classNames({
                    active_menu: checkMenuActive(item.path, location),
                  })}
                  onClick={() => {
                    handleClose(menu.path);
                    navigate(item.path);
                  }}
                  key={index}
                >
                  {item.title}
                </MenuItem>
              ))}
            </MenuMobile>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Box className={classes.root}>
      <Box>
        <Tooltip title={'Mở rộng'} arrow placement="right">
          <ButtonTop onClick={toggleSidebar} className={classes.topButton}>
            <Menu />
          </ButtonTop>
        </Tooltip>
      </Box>
      <Divider />
      <Box className={classes.top}>
        <Scrollbars>
          <Box>{renderMenuList()}</Box>
        </Scrollbars>
      </Box>

      {checkPermissionExpanded(me?.role || null) && (
        <Box>
          <Box className={classes.bottomButton}>
            <Tooltip title={'Cài đặt'} arrow placement="right">
              <ButtonMobile onClick={handleClickExpandSetting}>
                <SettingsOutlined />
              </ButtonMobile>
            </Tooltip>

            <ExpandSidebar
              anchorElExpandSetting={anchorElExpandSetting}
              handleCloseExpandSetting={handleCloseExpandSetting}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SidebarSmall;
