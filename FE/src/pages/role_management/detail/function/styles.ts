import theme from 'src/theme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
}));
