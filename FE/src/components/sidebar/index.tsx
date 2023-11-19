import { ExpandLessOutlined, ExpandMore, Menu, SettingsOutlined } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useLocation, useNavigate } from 'react-router-dom';

import { CMenuList, checkPermissionExpanded } from 'src/constants';
import { useAppSelector } from 'src/hooks';
import theme from 'src/theme';
import { IMenuRoute } from 'src/types/route';
import { checkShowMenu } from 'src/utils/function';
import ExpandSidebar from '../expand_sidebar';
import { ListSidebar, useStyles } from './styles';

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorElExpandSetting, setAnchorElExpandSetting] =
    React.useState<HTMLButtonElement | null>(null);

  const { me } = useAppSelector((state) => state.myAccountSlice);

  const [open, setOpen] = React.useState<{
    [x: string]: boolean;
  }>({});

  const handleOpen = (name: string) => {
    let hasCollapsed;
    const hasOpened = _.has(open, name);
    if (hasOpened) {
      hasCollapsed = !open[name];
    } else {
      hasCollapsed = !hasOpened;
    }
    setOpen({
      [name]: hasCollapsed,
    });
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

      return <Icon style={{ width: 24, height: 24, color: theme.palette.primary.main }} />;
    } else {
      Icon = menu.icon;
      return <Icon style={{ width: 24, height: 24 }} />;
    }
  };

  const renderMenuList = () => {
    return CMenuList.map((menu, index) => {
      if (!checkShowMenu(menu, me)) return;

      if (menu.isExpandSetting) return;

      return (
        <React.Fragment key={index}>
          <ListItemButton
            className={classNames({
              active:
                location.pathname === menu.path ||
                !_.isEmpty(menu?.subMenu?.find((item) => item.path === location.pathname)),
            })}
            onClick={() => {
              handleOpen(menu.path);
              menu?.path && navigate(menu.path);
            }}
            classes={{ root: classes.item }}
          >
            <ListItemIcon>{renderIcon(menu)}</ListItemIcon>
            <ListItemText primary={menu.title} />
            {menu?.subMenu && (
              <React.Fragment>
                {open?.[menu.path] ||
                !_.isEmpty(menu?.subMenu?.find((item) => item.path === location.pathname)) ? (
                  <ExpandLessOutlined />
                ) : (
                  <ExpandMore />
                )}
              </React.Fragment>
            )}
          </ListItemButton>
          {menu?.subMenu && (
            <Collapse
              in={
                open?.[menu.path] ||
                !_.isEmpty(menu?.subMenu?.find((item) => item.path === location.pathname))
              }
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {menu.subMenu.map((item, index) => (
                  <ListItemButton
                    className={classNames({
                      active_submenu: location.pathname === item.path,
                    })}
                    key={index}
                    sx={{ pl: 5, py: '6px' }}
                    classes={{ root: classes.item }}
                    onClick={() => {
                      navigate(item.path);
                    }}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Box className={classes.root}>
      <Box>
        <ListItemButton classes={{ root: classes.menuTop }}>
          <ListItemIcon
            classes={{
              root: classes.menuIcon,
            }}
          >
            <Menu />
          </ListItemIcon>
          <ListItemText primary={'Menu'} />
        </ListItemButton>
      </Box>
      <Divider />
      <Box className={classes.top}>
        <Scrollbars>
          <ListSidebar sx={{ p: 1 }}>{renderMenuList()}</ListSidebar>
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default Sidebar;
