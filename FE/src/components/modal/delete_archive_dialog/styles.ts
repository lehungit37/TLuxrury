import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
  paper: { overflow: 'initial !important' },
  dialog: {
    position: 'relative',
    paddingTop: 20,
    minWidth: 340,
    maxWidth: 475,
  },
  icon: {
    position: 'absolute',
    width: 65,
    height: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    top: -30,
    boxShadow: '-1px -11px 4px #00000040',
    zIndex: 9,
    background: 'white',
  },
  dialogTitle: {
    '& h2': {
      fontSize: 20,
    },
  },
  actionButton: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
  wrapperButton: {
    position: 'relative',
  },
}));
