import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material';

import NunitoRegular from 'src/assets/fonts/Nunito-Regular.ttf';

interface IMuiCssBaseline {
  defaultProps?: ComponentsProps['MuiCssBaseline'];
  styleOverrides?: ComponentsOverrides['MuiCssBaseline'];
  variants?: ComponentsVariants['MuiCssBaseline'];
}

const MuiCssBaseline: IMuiCssBaseline = {
  styleOverrides: `
  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: local('Nunito'), local('Nunito-Regular'), url(${NunitoRegular}) format('truetype');
    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
`,
};

export default MuiCssBaseline;
