import React from 'react';
import { Box, Button, SxProps, Typography } from '@mui/material';

interface IErrorMessageProps {
  sx?: SxProps;
  marginTop?: number;
  textAlign?: 'center' | 'left' | 'right';
  onClick?: () => void;
}

function ErrorMessage(props: IErrorMessageProps) {
  const { marginTop = 2, textAlign = 'center', sx } = props;

  return (
    <Box sx={sx} textAlign={textAlign} marginTop={marginTop}>
      <Typography variant="body1" mb={1.5}>
        Đã có lỗi xảy ra
      </Typography>
      <Button onClick={props.onClick} variant="contained" color="primary">
        Thử lại
      </Button>
    </Box>
  );
}

export default ErrorMessage;
