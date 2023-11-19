import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CPath } from 'src/constants';
import logo from '../../assets/images/logo.png';
import { styles } from './styles';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box sx={styles.container}>
          <Box sx={styles.boxNotFound}>
            <Box sx={styles.image}>
              <img style={{ width: '300px' }} src={logo} alt={logo} />
            </Box>
            <Box sx={styles.content}>
              <Typography
                variant="h2"
                sx={{ fontSize: '100px', fontWeight: '600', fontFamily: 'Roboto' }}
              >
                400
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: '30px', fontWeight: '500', fontFamily: 'Roboto' }}
              >
                Có lỗi xảy ra.
              </Typography>
              <Typography sx={{ padding: '10px 0' }}>
                Hệ thống đang được bảo trì hoặc có lỗi.
              </Typography>
              <Link style={{ textDecoration: 'none' }} onClick={() => this.setState({ hasError: false })} to={CPath.home}>
                <Button variant="outlined">
                  <KeyboardReturnOutlinedIcon sx={{ marginRight: '8px' }} /> Về trang chủ
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
