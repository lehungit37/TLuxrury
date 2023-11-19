import React from 'react';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { FormInput } from 'src/components/hook_form';
import { CModalIds } from 'src/constants/modal';
import { toastMessage } from 'src/utils/toast';
import { useQuery } from 'src/hooks';
import { useAppDispatch } from 'src/redux_store';
import { IPayloadVerifyPassword } from 'src/types/my_account';
import { verifyPassword } from 'src/redux_store/my_account/my_account_actions';
import { CPath } from 'src/constants';
import { closeModal } from 'src/redux_store/common/modal_slice';

import { useStyles } from './styles';

const schema = yup
  .object({
    password: yup.string().required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup.string().required('Vui lòng nhập xác nhật mật khẩu'),
  })
  .required();

const FormVerifyPassword = () => {
  const [query] = useQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  const onSubmit = (data: any) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toastMessage.error('Xác nhận mật khẩu không đúng');

      return;
    }

    const payload: IPayloadVerifyPassword = {
      email: query.email,
      password,
      token: query.token,
      userId: query.id,
    };

    dispatch(verifyPassword(payload))
      .unwrap()
      .then(() => {
        toastMessage.success('Cập nhật mật khẩu thành công, bạn có thể truy cập hệ thống');
        dispatch(closeModal({ modalId: CModalIds.verify_password }));
        navigate(CPath.login);
      });
  };

  return (
    <DialogWrapper isNotAutoClose classNames={classes.root} modalId={CModalIds.verify_password}>
      <Box className={classes.form} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" textAlign="center">
          Thay đổi mật khẩu mới
        </Typography>
        <Box flex={1}>
          <FormInput type="password" control={control} label="Mật khẩu mới" name="password" />
          <FormInput
            type="password"
            control={control}
            label="Xác nhận mật khẩu"
            name="confirmPassword"
          />
        </Box>
        <Grid container justifyContent="center">
          <Grid item>
            <LoadingButton type="submit" variant="contained">
              Thay đổi mật khẩu
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
};

export default FormVerifyPassword;
