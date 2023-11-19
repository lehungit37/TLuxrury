import { styled, Theme, List } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const ListSidebar = styled(List)(({ theme }) => ({
  padding: 0,
  '& > .MuiListItemButton-root': {
    padding: '6px 10px',
    borderRadius: 5,
    color: theme.palette.secondary.main,

    '.MuiListItemIcon-root': {
      minWidth: 'unset',
      marginRight: 8,
      color: theme.palette.secondary.main,
    },
    '.MuiTypography-root': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '&.active': {
      background: theme.palette.secondary.light,
    },
  },
  '& > .MuiListItemButton-root.active': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    '.MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },

  '& .active_submenu': {
    color: theme.palette.error.main,
  },
}));

export const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 230,
    flexShrink: 0,
    backgroundColor: theme.palette.common.white,
  },
  top: {
    display: 'flex',
    flex: 1,
  },
  menuTop: {
    padding: '8px 20px !important',
  },
  menuIcon: {
    minWidth: 'unset !important',
    marginRight: 8,
  },
  item: {
    marginBottom: '10px !important',
  },
}));
