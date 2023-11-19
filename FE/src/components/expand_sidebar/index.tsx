import { List, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CMenuList } from 'src/constants';
import { useAppSelector } from 'src/hooks';
import { IMenuRoute } from 'src/types/route';
import { checkMenuActive, checkShowMenu } from 'src/utils/function';
import { useStyles } from '../sidebar_small/styles';

type Props = {
  anchorElExpandSetting: HTMLButtonElement | null;
  handleCloseExpandSetting: () => void;
  isExpandMenu?: boolean;
};

const ExpandSidebar = (props: Props) => {
  const { anchorElExpandSetting, isExpandMenu = false, handleCloseExpandSetting } = props;
  const { me } = useAppSelector((state) => state.myAccountSlice);
  const openExpandSetting = Boolean(anchorElExpandSetting);
  const id = openExpandSetting ? 'simple-popover' : undefined;
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const renderIcon = (menu: IMenuRoute) => {
    let Icon;

    if (location.pathname === menu.path) {
      Icon = menu.activeIcon;
    } else {
      Icon = menu.icon;
    }

    return <Icon color={checkMenuActive(menu.path, location) ? 'primary' : 'default'} />;
  };

  return (
    <Popover
      id={id}
      open={openExpandSetting}
      anchorEl={anchorElExpandSetting}
      onClose={handleCloseExpandSetting}
      sx={{ left: isExpandMenu ? 100 : 40 }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <List sx={{ padding: 1 }}>
        {CMenuList.map((menu, index) => {
          if (!checkShowMenu(menu, me)) return;
          if (!menu.isExpandSetting) return;
          return (
            <ListItemButton
              key={index}
              selected={checkMenuActive(menu.path, location)}
              classes={{ root: classes.item }}
              onClick={() => {
                navigate(menu.path);
                handleCloseExpandSetting();
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{renderIcon(menu)}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: checkMenuActive(menu.path, location) ? 'primary' : 'default',
                  fontWeight: checkMenuActive(menu.path, location) ? 'bold' : 400,
                }}
                primary={menu.title}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Popover>
  );
};

export default ExpandSidebar;
