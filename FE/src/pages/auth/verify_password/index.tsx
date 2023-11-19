import React, { useEffect } from 'react';

import { CModalIds } from 'src/constants/modal';
import { useAppDispatch } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import FormVerifyPassword from './form';

const VerifyPassword = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      openModal({ modalId: CModalIds.verify_password, modalComponent: <FormVerifyPassword /> }),
    );
  }, []);

  return <></>;
};

export default VerifyPassword;
