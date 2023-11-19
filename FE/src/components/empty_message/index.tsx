import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyMessage = () => {
  return (
    <Box textAlign="center">
      <Typography component="p">-- Không có dữ liệu --</Typography>
    </Box>
  );
};

export default EmptyMessage;
