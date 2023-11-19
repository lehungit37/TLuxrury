import React from 'react';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { CPath } from 'src/constants';
import { CModalIds } from 'src/constants/modal';
import { useAppDispatch } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { logout } from 'src/redux_store/my_account/my_account_actions';
import { logoutLocal } from 'src/redux_store/my_account/my_account_slice';
import ConfirmationDialog from '../confirm_dialog';

const ModalAcceptLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        dispatch(closeModal({ modalId: CModalIds.logout }));
        navigate(CPath.login);
      });
  };
  return (
    <ConfirmationDialog
      callback={handleLogout}
      describe="Bạn có muốn đăng xuất không?"
      functionName="logout"
      modalId={CModalIds.logout}
      sliceName="myAccount"
      okLabel="Đăng xuất"
      icon={<LogoutOutlined fontSize="large" color="primary" />}
    />
  );
};

export default ModalAcceptLogout;
