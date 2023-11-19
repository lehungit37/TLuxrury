import React from 'react';
import ConfirmationDialog from 'src/components/modal/confirm_dialog';
import { CModalIds } from 'src/constants/modal';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { deleteRole, getRoleList } from 'src/redux_store/role/role_action';
import { setIdRoleSelected } from 'src/redux_store/role/role_slice';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { toastMessage } from 'src/utils/toast';
import { findIndexItem } from 'src/utils/function';

const ModalAcceptDeleteRole = () => {
  const {
    roleInfo,
    payload,
    roleData: { data },
    selectedId,
  } = useAppSelector((state) => state.roleSlice);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (roleInfo.id) {
      dispatch(deleteRole(roleInfo.id))
        .unwrap()
        .then(() => {
          toastMessage.success('Xóa vai trò thành công');
          dispatch(setIdRoleSelected(''));
          dispatch(getRoleList(payload));
          dispatch(closeModal({ modalId: CModalIds.deleteRole }));
        });
    }
  };

  const returnUserOfRole = () => {
    const index = findIndexItem(data, selectedId);

    if (index === -1) return 0;

    return data[index].totalUser;
  };

  return (
    <ConfirmationDialog
      callback={handleDelete}
      describe={
        returnUserOfRole() > 0
          ? `Vai trò ${
              roleInfo.name
            } hiện đang có ${returnUserOfRole()} người dùng, bạn có muốn xóa không ?`
          : `Bạn có muốn xóa vai trò ${roleInfo.name}`
      }
      functionName="deleteRole"
      sliceName="role"
      modalId={CModalIds.deleteRole}
      okLabel="Đồng ý"
      icon={<DeleteOutlineOutlined color="error" />}
    />
  );
};

export default ModalAcceptDeleteRole;
