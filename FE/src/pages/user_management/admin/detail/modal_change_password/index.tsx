import React from 'react';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { FormInput } from 'src/components/hook_form';
import { CModalIds } from 'src/constants/modal';
import { toastMessage } from 'src/utils/toast';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { updateUserPassword } from 'src/redux_store/user/user_actions';

import { useStyles } from './styles';

const schema = yup
    .object({
        password: yup.string().required('Vui lòng nhập mật khẩu'),
        confirmPassword: yup.string().required('Vui lòng nhập xác nhật mật khẩu'),
    })
    .required();

const ModalChangePassword = () => {
    const { selectedId } = useAppSelector((state) => state.userSlice);
    const isLoading = useIsRequestPending('user', 'updateUserPassword');
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
        if (!selectedId) return;
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            toastMessage.error('Xác nhận mật khẩu không đúng');

            return;
        }

        dispatch(updateUserPassword({ password, userId: selectedId }))
            .unwrap()
            .then(() => {
                toastMessage.success('Thay đổi mật khẩu thành công');
                handleClose();
            });
    };

    const handleClose = () => {
        dispatch(closeModal({ modalId: CModalIds.changePassword }));
    };

    return (
        <DialogWrapper classNames={classes.root} modalId={CModalIds.changePassword}>
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
                <Grid container justifyContent="center" columnSpacing={1}>
                    <Grid item>
                        <Button onClick={handleClose} variant="outlined">
                            Hủy bỏ
                        </Button>
                    </Grid>
                    <Grid item>
                        <LoadingButton loading={isLoading} type="submit" variant="contained">
                            Lưu
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </DialogWrapper>
    );
};

export default ModalChangePassword;
