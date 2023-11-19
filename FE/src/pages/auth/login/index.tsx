import React, { Fragment } from 'react';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginOutlined } from '@mui/icons-material';

import sitechLogo from 'src/assets/svg/sitech-logo.svg';
import theme from 'src/theme';
import { FormInput } from 'src/components/hook_form';
import { useAppDispatch } from 'src/redux_store';
import { login } from 'src/redux_store/my_account/my_account_actions';
import { toastMessage } from 'src/utils/toast';
import { useIsRequestPending } from 'src/hooks';

import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { CPath } from 'src/constants';
import { isSiTechSystem } from 'src/utils/function';

const schema = yup
  .object({
    email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  })
  .required();

const Login = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoadingLogin = useIsRequestPending('myAccount', 'login');
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(login(data))
      .unwrap()
      .catch((error) => {
        toastMessage.error(error.message || 'Lỗi hệ thống');
      });
  };
  return (
    <Fragment>
      <Box
        className={classes.root}
        sx={{
          pb: (theme) => (isSiTechSystem ? theme.spacing(3) : theme.spacing(4)),
        }}
      >
        {isSiTechSystem && (
          <Box className={classes.logo}>
            <img className={classes.logoImg} src={sitechLogo} alt="sitech.vn" />
          </Box>
        )}
        <Box sx={{ position: 'relative' }}>
          <Box className={classes.text}>
            <Typography
              fontWeight="bold"
              variant="h6"
              textTransform={isSiTechSystem ? 'uppercase' : 'initial'}
              color={theme.palette.common.white}
            >
              TLuxury
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormInput control={control} label="Email" name="email" />
            <FormInput control={control} label="Mật khẩu" name="password" type="password" />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={isSiTechSystem ? 2 : 1}
            >
              <Grid item>
                <LoadingButton
                  startIcon={<LoginOutlined />}
                  type="submit"
                  variant="contained"
                  loading={isLoadingLogin}
                >
                  Đăng nhập
                </LoadingButton>
              </Grid>
              <Grid item>
                <Link onClick={() => navigate(CPath.sendEmail)} sx={{ cursor: 'pointer' }}>
                  Quên mật khẩu
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {isSiTechSystem && (
        <Box sx={{ position: 'absolute', bottom: 10, left: 0, width: '100%' }}>
          <Typography textAlign="center" variant="subtitle1" noWrap color="white">
            Bản quyền thuộc về SITECH |{' '}
            <Typography
              variant="subtitle1"
              color="white"
              component="a"
              href="https://sitech.vn"
              target="_blank"
            >
              www.sitech.vn
            </Typography>
          </Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default Login;
