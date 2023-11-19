import { Components, Theme } from '@mui/material';

import MuiCssBaseline from './mui_base';
import MuiButton from './mui_button';

const components: Components<Theme> = {
  MuiCssBaseline,
  MuiButton,
  MuiSelect: {
    styleOverrides: {
      select: {},
    },
  },
};

export default components;
