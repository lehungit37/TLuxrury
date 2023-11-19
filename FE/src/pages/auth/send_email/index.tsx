import React from 'react';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SendOutlined } from '@mui/icons-material';

import { FormInput } from 'src/components/hook_form';
import { useAppDispatch } from 'src/redux_store';
import { sendEmailForgotPassword } from 'src/redux_store/my_account/my_account_actions';
import { toastMessage } from 'src/utils/toast';
import { useIsRequestPending } from 'src/hooks';

import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { CPath } from 'src/constants';
const schema = yup
  .object({
    email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
  })
  .required();

const SendEmail = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoadingLogin = useIsRequestPending('myAccount', 'sendEmailForgotPassword');
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { email: string }) => {
    dispatch(sendEmailForgotPassword(data.email))
      .unwrap()
      .then(() => {
        toastMessage.success('Gửi email thành công, vui lòng kiểm tra hộp thư của bạn');
      });
  };
  return (
    <Box className={classes.root}>
      <Box sx={{ position: 'relative' }}>
        <Typography mb={2} variant="h5" align="center">
          Quên mật khẩu
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput control={control} label="Email" name="email" />
          <Grid container justifyContent="space-between" alignItems="center" mt={1}>
            <Grid item>
              <LoadingButton
                startIcon={<SendOutlined />}
                type="submit"
                variant="contained"
                loading={isLoadingLogin}
              >
                Gửi email
              </LoadingButton>
            </Grid>
            <Grid item>
              <Link onClick={() => navigate(CPath.login)} sx={{ cursor: 'pointer' }}>
                Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SendEmail;
