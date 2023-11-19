import { makeStyles } from '@mui/styles';
import theme from 'src/theme';

export const useStyles = makeStyles(() => ({
  root: {
    width: 700,
    height: 700,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(1),
  },
}));
