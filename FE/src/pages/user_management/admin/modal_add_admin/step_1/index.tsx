import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/components/hook_form';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch } from 'src/redux_store';
import { checkExistEmail } from 'src/redux_store/user/user_actions';
import { isValidPhoneNumber } from 'src/utils/validation';
import * as yup from 'yup';

const schema = yup
    .object({
        name: yup.string().required('Vui lòng nhập tên admin'),
        email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
        phoneNumber: yup.string(),
        workplace: yup.string(),
        address: yup.string(),
        description: yup.string(),
    })
    .required();

interface IFormAddAdmin {
    name: string;
    email: string;
    phoneNumber: string;
    workplace: string;
    address: string;
    description: string;
}

type Props = {
    userForm: IFormAddAdmin;
    setUserForm: React.Dispatch<React.SetStateAction<IFormAddAdmin>>;
    handleChangeStep: (step: 1 | -1) => void;
    handleCloseModal: () => void;
};
const Step1AddAdmin = (props: Props) => {
    const { handleCloseModal, handleChangeStep, userForm, setUserForm } = props;
    const dispatch = useAppDispatch();

    const isLoading = useIsRequestPending('user', 'checkExistEmail');

    const { control, handleSubmit, setError } = useForm({
        defaultValues: userForm,
        resolver: yupResolver(schema),
    });

    const handleClose = () => {
        handleCloseModal();
    };

    const onSubmit = (data: IFormAddAdmin) => {
        const { email, phoneNumber } = data;

        if (phoneNumber) {
            if (!isValidPhoneNumber(phoneNumber)) {
                return setError('phoneNumber', {
                    message: 'Số điện thoại không đúng định dạng',
                });
            }
        }
        dispatch(checkExistEmail(email))
            .unwrap()
            .then(() => {
                setUserForm(data);
                handleNext();
            })
            .catch((error) => {
                setError('email', { message: error.message });
            });
    };

    const handleNext = () => {
        handleChangeStep(1);
    };
    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box flex={1} component="form" onSubmit={handleSubmit(onSubmit)}>
                <FormInput control={control} name="name" label="Tên admin" />
                <FormInput control={control} name="email" label="Email" />
                <FormInput control={control} name="phoneNumber" label="Số điện thoại" />
                <FormInput control={control} name="workplace" label="Cơ quan" />
                <FormInput control={control} name="address" label="Đia chỉ" />
                <FormInput control={control} name="description" label="Mô tả" />
            </Box>
            <Grid container columnSpacing={1} justifyContent="flex-end">
                <Grid item>
                    <Button variant="outlined" onClick={handleClose}>
                        Hủy bỏ
                    </Button>
                </Grid>
                <Grid item>
                    <LoadingButton
                        loading={isLoading}
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        variant="contained"
                    >
                        Tiếp tục
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Step1AddAdmin;
