import { CLimit } from 'src/constants';
import theme from 'src/theme';

export const getColorRandom = (index: number) => {
  switch (index % 4) {
    case 0:
      return theme.palette.primary.main;
    case 1:
      return theme.palette.error.main;
    case 2:
      return theme.palette.success.main;
    case 3:
      return theme.palette.warning.main;
    default:
      return theme.palette.primary.main;
  }
};

export const getTotalPage = (totalData: number, limit?: number) => {
  return limit ? Math.ceil(totalData / limit) : Math.ceil(totalData / CLimit);
};
