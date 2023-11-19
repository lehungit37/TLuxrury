import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    display: 'flex',
  },
  wrapper: {
    flex: 1,
    background: theme.palette.secondary.light,
    display: 'flex',
  },
  page: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
}));
