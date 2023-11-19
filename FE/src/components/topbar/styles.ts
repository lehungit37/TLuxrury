import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    background: theme.palette.common.white,
    zIndex: 2,
    justifyContent: 'space-between',
  },
  logo: {},
  logoImg: {
    height: '100%',
    objectFit: 'contain',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(3),
    color: theme.palette.secondary.main,
  },
  buttonAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  iconTopBar: {},
}));
