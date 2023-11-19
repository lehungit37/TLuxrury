import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
  table: {},
  th: {
    position: 'relative',
    '@media (hover:hover)': {
      '&:hover div': {
        opacity: 1,
      },
    },
  },
  resizer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 5,
    background: theme.palette.grey[500],
    cursor: 'col-resize',
    userSelect: 'none',
    touchAction: 'none',
    opacity: 0,
  },
  isResizing: {
    background: theme.palette.primary.main,
    opacity: 1,
  },
}));
