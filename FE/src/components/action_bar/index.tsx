import React, { ReactNode } from 'react';
import { AspectRatioOutlined, KeyboardDoubleArrowRightOutlined } from '@mui/icons-material';
import { Box, Button, SxProps } from '@mui/material';
import theme from 'src/theme';

interface IProps {
  handleClose: () => void;
  right: ReactNode;
  disabled?: boolean;
  sx?: SxProps;
  sxAction?: SxProps;
}

const ActionBar = ({
  handleClose,

  right,
  sx,
  sxAction,
  disabled,
}: IProps) => {
  return (
    <Box
      p={1}
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor={theme.palette.background.paper}
      height={50}
      sx={sx}
    >
      <Box>
        <Button
          disabled={disabled}
          type="button"
          color="secondary"
          startIcon={<KeyboardDoubleArrowRightOutlined />}
          onClick={handleClose}
        >
          Ẩn thông tin
        </Button>
      </Box>
      <Box flex={1} sx={sxAction}>
        {right}
      </Box>
    </Box>
  );
};

export default ActionBar;
