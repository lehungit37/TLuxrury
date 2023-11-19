import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>(() => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
  },
  boxNotFound: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '350px',
    height: 'auto',
  },
  content: {
    marginLeft: '50px',
    width: 'auto',
    height: '70%',
  },
}));
