import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  dialogTitle: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: '0 !important',
    padding: '16px !important',
  },
  iconButton: {
    right: 8,
    top: 8,
    color: `${theme.palette.grey[500]} !important`,
  },
}));
