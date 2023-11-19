import { DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React from 'react';
import { CModalIds } from 'src/constants/modal';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import { toastMessage } from 'src/redux_store/common/toast/toast_action';
import ModalAcceptDeleteUser from '../modal_accept_delete';

const AdminDetailAction = () => {
  const {
    typeTabSelected,
    userInfo,
    configData: { stationSelectedList },
    trackAllStation,
  } = useAppSelector((state) => state.userSlice);

  const { me } = useAppSelector((state) => state.myAccountSlice);
  const dispatch = useAppDispatch();

  const isLoadingConfigUserStation = useIsRequestPending('user', 'configUserStation');
  const isLoadingDeleteUser = useIsRequestPending('user', 'deleteUser');
  const isLoadingUpdateUser = useIsRequestPending('user', 'updateUser');

  const handleOpenModalDeleteUser = () => {
    dispatch(
      openModal({
        modalId: CModalIds.deleteUser,
        modalComponent: <ModalAcceptDeleteUser />,
      }),
    );
  };

  const getDisabled = () => {
    if (!me) return true;

    return me.role?.level === userInfo.role?.level;
  };

  const renderTypeButton = () => {
    const buttonGroup: any = {
      general: (
        <LoadingButton
          type="submit"
          form="form_update_user"
          color="secondary"
          startIcon={<SaveOutlined />}
          loading={isLoadingUpdateUser}
          disabled={getDisabled()}
        >
          Lưu
        </LoadingButton>
      ),

      //button Group camera
      permission: (
        <LoadingButton
          type="submit"
          form="update_role"
          color="secondary"
          startIcon={<SaveOutlined />}
          disabled={getDisabled()}
          loading={isLoadingUpdateUser}
        >
          Lưu
        </LoadingButton>
      ),
    };
    return buttonGroup[typeTabSelected];
  };

  return (
    <Grid flex={1} container justifyContent="flex-end" alignItems="center" columnSpacing={2}>
      <>
        <Grid item>
          <LoadingButton
            color="secondary"
            variant="text"
            startIcon={<DeleteOutlined />}
            onClick={handleOpenModalDeleteUser}
            loading={isLoadingDeleteUser}
            disabled={getDisabled()}
          >
            Xóa
          </LoadingButton>
        </Grid>
        <Grid item>{renderTypeButton()}</Grid>
      </>
    </Grid>
  );
};

export default AdminDetailAction;
