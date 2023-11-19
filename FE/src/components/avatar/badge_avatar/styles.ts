import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
  bagde: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    bottom: '20% !important',
    right: '20% !important',
    minWidth: '12px !important',
    minHeight: '12px !important',
    borderRadius: '50% !important',
  },
}));
