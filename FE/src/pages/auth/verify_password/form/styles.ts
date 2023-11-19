import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    height: 250,
    width: 450,
    padding: theme.spacing(2),
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));
