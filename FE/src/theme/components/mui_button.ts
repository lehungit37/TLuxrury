import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material';

type TMuiButton = {
  defaultProps?: ComponentsProps['MuiButton'];
  styleOverrides?: ComponentsOverrides['MuiButton'];
  variants?: ComponentsVariants['MuiButton'];
};

const MuiButton: TMuiButton = {
  styleOverrides: {
    root: {
      fontSize: '0.875rem',
      fontWeight: 600,
      boxShadow: 'none',
      textTransform: 'none',
    },
  },
};

export default MuiButton;
