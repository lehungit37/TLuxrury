import { DeleteOutlineOutlined } from '@mui/icons-material';
import React from 'react';
import ConfirmationDialog from 'src/components/modal/confirm_dialog';
import { CModalIds } from 'src/constants/modal';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { deleteUser, getUserList } from 'src/redux_store/user/user_actions';
import { setSelectedId } from 'src/redux_store/user/user_slice';
import { toastMessage } from 'src/utils/toast';

const ModalAcceptDeleteUser = () => {
  const { userInfo, payload } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();
  const handleDelete = () => {
    if (!userInfo.id) return;

    dispatch(deleteUser(userInfo.id))
      .unwrap()
      .then(() => {
        dispatch(setSelectedId(''));

        toastMessage.success('Xóa người dùng thành công');
        dispatch(closeModal({ modalId: CModalIds.deleteUser }));
        dispatch(getUserList(payload));
      });
  };
  return (
    <ConfirmationDialog
      callback={handleDelete}
      describe={`Bạn có muốn xóa nguời dùng ${userInfo.name}`}
      functionName="deleteUser"
      sliceName="user"
      modalId={CModalIds.deleteUser}
      okLabel="Đồng ý"
      icon={<DeleteOutlineOutlined />}
    />
  );
};

export default ModalAcceptDeleteUser;
