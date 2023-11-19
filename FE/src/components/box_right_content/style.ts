import { Theme } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { isSiTechSystem } from 'src/utils/function';

export const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    height: `calc(100% - ${theme.spacing(isSiTechSystem ? 11 : 6)})`,
    background: theme.palette.secondary.light,
    width: 300,
    boxSizing: 'border-box',
    right: 0,
    marginTop: 1,
    top: theme.spacing(isSiTechSystem ? 11 : 6),
    borderLeft: `1px solid ${theme.palette.divider}`,
    position: 'fixed',
    zIndex: 10,
  },

  rootPin: {
    width: 300,
    background: theme.palette.secondary.light,
    borderLeft: `1px solid ${theme.palette.divider}`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.paper,
    padding: '8px',
    height: 49,
  },
  headerTitle: {
    textTransform: 'uppercase',
    fontWeight: '600 !important',
    flex: '1',
    textAlign: 'left',
    color: theme.palette.primary.main,
  },
}));
