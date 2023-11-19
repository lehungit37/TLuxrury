import { Button, ButtonProps, Menu, MenuProps, styled, Theme } from '@mui/material';

import { makeStyles } from '@mui/styles';

export const ButtonMobile = styled(Button)<ButtonProps>(({ theme }) => ({
  minWidth: 'unset',
  padding: 8,
  borderRadius: 5,
  boxSizing: 'border-box',
  border: `1px solid transparent`,
  '&:hover, &.active': {
    transition: 'all linear 0.3s',
    svg: {
      color: theme.palette.primary.main,
      transition: 'all linear 0.3s',
    },
  },

  '&.active': { background: theme.palette.secondary.light },

  svg: {
    color: theme.palette.secondary.main,
  },
}));

export const ButtonTop = styled(Button)<ButtonProps>(({ theme }) => ({
  minWidth: 'unset',
  width: '100%',
  height: theme.spacing(6),
  borderRadius: 0,
  svg: {
    color: theme.palette.secondary.main,
  },
}));

export const MenuMobile = styled(Menu)<MenuProps>(({ theme }) => ({
  '& .MuiMenuItem-root': {
    color: theme.palette.common.black,
    svg: {
      color: theme.palette.common.black,
    },
    '&.active_menu': {
      color: theme.palette.error.main,
      svg: {
        color: theme.palette.error.main,
      },
    },
  },
}));

export const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 56,
    backgroundColor: theme.palette.common.white,
    flexShrink: 0,
  },
  top: {
    display: 'flex',
    flex: 1,
  },
  listItem: {
    padding: '8px 8px 0',
  },
  topButton: {
    padding: '4px 10px',
  },
  bottomButton: {
    padding: 8,
    borderBottom: `1px solid rgba(${theme.palette.common.black},0.26)`,
  },
}));
