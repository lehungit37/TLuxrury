import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import bg from 'src/assets/images/bg_login.jpg';
import bgSitech from 'src/assets/images/sitech_bg.jpg';
import { CConfig } from 'src/constants';

const isSitech = CConfig.systemName === 'SITECH';

export const useStyles = makeStyles<Theme>(() => ({
  root: {
    background: `url(${isSitech ? bgSitech : bg})`,
    backgroundSize: 'cover',
    height: '100vh',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
}));
