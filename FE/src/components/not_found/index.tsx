import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CPath } from 'src/constants';
import logo from '../../assets/images/logo.png';
import { useStyles } from './styles';

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Box className={classes.boxNotFound}>
        <Box className={classes.image}>
          <img style={{ width: '350px' }} src={logo} alt={logo} />
        </Box>
        <Box className={classes.content}>
          <Typography
            variant="h2"
            sx={{ fontSize: '120px', fontWeight: '600', fontFamily: 'Roboto' }}
          >
            404
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: '30px', fontWeight: '500', fontFamily: 'Roboto' }}
          >
            Không tìm thấy trang.
          </Typography>
          <Typography sx={{ padding: '10px 0' }}>
            Trang không tồn tại hoặc bạn không có quyền truy cập trang này.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(CPath.home);
            }}
          >
            <KeyboardReturnOutlinedIcon sx={{ marginRight: '5px' }} /> Về trang chủ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
