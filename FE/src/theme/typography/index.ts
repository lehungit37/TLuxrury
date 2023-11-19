import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Palette } from '@mui/material';

type TTypography = TypographyOptions | ((palette: Palette) => TypographyOptions);

const typography: TTypography = {
  fontFamily: 'Nunito, Roboto, Arial',
  body1: {
    fontSize: 14,
  },
};

export default typography;
