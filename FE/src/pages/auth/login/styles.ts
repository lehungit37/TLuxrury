import theme from 'src/theme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    width: 600,
    background: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    position: 'absolute',
    top: '50%',
    left: '3%',
    transform: 'translateY(-50%)',
  },
  logo: {
    position: 'absolute',
    top: -135,
    left: 0,
    height: '150px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: theme.spacing(1),
    background: theme.palette.common.white,
    paddingTop: 20,
    zIndex: 9,
  },

  logoImg: {
    height: 70,
  },
  text: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    textAlign: 'center',
    borderRadius: theme.spacing(0.5),
    position: 'absolute',
    width: '100%',
    top: '-40%',
    zIndex: 10,
  },
}));
