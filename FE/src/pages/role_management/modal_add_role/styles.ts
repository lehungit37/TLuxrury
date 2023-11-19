import theme from 'src/theme';
import { makeStyles } from '@mui/styles';

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
