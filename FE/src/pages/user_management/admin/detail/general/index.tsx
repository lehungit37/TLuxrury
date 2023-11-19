import { yupResolver } from '@hookform/resolvers/yup';
import { CachedOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/components/hook_form';
import Loading from 'src/components/loading';
import { CModalIds } from 'src/constants/modal';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import {
  getUserDetail,
  revokeAllSession,
  sendActiveEmail,
  updateUser,
} from 'src/redux_store/user/user_actions';
import { IUpdateUser } from 'src/types/user';
import { toastMessage } from 'src/utils/toast';
import * as yup from 'yup';
import ModalChangePassword from '../modal_change_password';

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

const GeneralUser = () => {
  const { selectedId, userInfo } = useAppSelector((state) => state.userSlice);
  const { me } = useAppSelector((state) => state.myAccountSlice);
  const isLoading = useIsRequestPending('user', 'getUserDetail');
  const isLoadingRevokeSession = useIsRequestPending('user', 'revokeAllSession');
  const isLoadingSendActiveEmail = useIsRequestPending('user', 'sendActiveEmail');

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      workplace: userInfo.workplace,
      address: userInfo.address,
      description: userInfo.description,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      setValue('name', userInfo.name);
      setValue('email', userInfo.email);
      setValue('phoneNumber', userInfo.phoneNumber);
      setValue('workplace', userInfo.workplace);
      setValue('address', userInfo.address);
      setValue('description', userInfo.description);
    }
  }, [userInfo]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!selectedId) return;

    dispatch(getUserDetail(selectedId));
  }, [selectedId]);

  const onSubmit = (data: any) => {
    const user: IUpdateUser = {
      address: data.address,
      description: data.description,
      name: data.name,
      phoneNumber: data.phoneNumber,
      workplace: data.workplace,
    };

    if (selectedId) {
      dispatch(updateUser({ user, userId: selectedId }))
        .unwrap()
        .then(() => {
          toastMessage.success('Cập nhật người dùng thành công');
        });
    }
  };

  const handleRevokeAllSession = () => {
    if (!selectedId) return;

    dispatch(revokeAllSession(selectedId))
      .unwrap()
      .then(() => {
        toastMessage.success('Thu hồi phiên người dùng thành công');
      });
  };

  const handleSendActiveEmail = () => {
    dispatch(sendActiveEmail(selectedId))
      .unwrap()
      .then(() => {
        toastMessage.success('Gửi email xác thực thành công, vui lòng kiểm tra hộp thư');
      });
  };

  const handleOpenModalChangePassword = () => {
    dispatch(
      openModal({ modalId: CModalIds.changePassword, modalComponent: <ModalChangePassword /> }),
    );
  };

  const getDisabled = () => {
    // if (!me) return true;

    // return me.role?.level === userInfo.role?.level;

    return false;
  };

  if (isLoading) return <Loading />;

  return (
    <Scrollbars>
      <Box p={2} id="form_update_user" component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput control={control} name="name" label="Tên người dùng" disabled={getDisabled()} />
        <FormInput control={control} name="email" label="Email" disabled />
        <FormInput
          control={control}
          name="phoneNumber"
          label="Số điện thoại"
          disabled={getDisabled()}
        />
        <FormInput control={control} name="workplace" label="Cơ quan" disabled={getDisabled()} />
        <FormInput control={control} name="address" label="Địa chỉ" disabled={getDisabled()} />
        <FormInput control={control} name="description" label="Mô tả" disabled={getDisabled()} />
      </Box>

      <Box p={2}>
        <Typography variant="h6">NGƯỜI DÙNG VÀ BẢO MẬT</Typography>
        <Box px={1} mt={1} mb={2}>
          <Typography variant="h6">BẢO MẬT</Typography>

          <Button
            onClick={handleOpenModalChangePassword}
            variant="outlined"
            startIcon={<CachedOutlined />}
            disabled={getDisabled()}
          >
            Đặt lại mật khẩu
          </Button>
        </Box>
        <Box px={1} mb={2}>
          <Typography variant="h6">PHIÊN NGƯỜI DÙNG</Typography>
          <Typography mb={1}>
            Sau khi thu hồi, phiên người dùng sẽ được xóa hết khỏi thông tin
          </Typography>
          <LoadingButton
            onClick={handleRevokeAllSession}
            variant="outlined"
            startIcon={<CachedOutlined />}
            loading={isLoadingRevokeSession}
            disabled={getDisabled()}
          >
            Thu hồi tất cả
          </LoadingButton>
        </Box>
        {!userInfo.emailVerified && (
          <Box px={1}>
            <Typography variant="h6">Xác minh email</Typography>
            <Typography mb={1}>
              Sau khi xác minh, người dùng có thể truy cập vào hệ thống
            </Typography>
            <LoadingButton
              loading={isLoadingSendActiveEmail}
              onClick={handleSendActiveEmail}
              variant="outlined"
              startIcon={<VerifiedUserOutlined />}
            >
              Yêu cầu xác minh
            </LoadingButton>
          </Box>
        )}
      </Box>
    </Scrollbars>
  );
};

export default GeneralUser;
