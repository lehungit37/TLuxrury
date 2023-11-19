import React from 'react';
import { LoadingButton } from '@mui/lab';
import { DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import { CModalIds } from 'src/constants/modal';
import ModalAcceptDeleteRole from '../modal_accept_delete';

type Props = {
  typeTab: 'function' | 'user';
};

const RoleDetailAction = (props: Props) => {
  const { typeTab } = props;
  const { roleInfo } = useAppSelector((state) => state.roleSlice);
  const dispatch = useAppDispatch();

  const handleOpenModalDelete = () => {
    dispatch(
      openModal({
        modalId: CModalIds.deleteRole,
        modalComponent: <ModalAcceptDeleteRole />,
      }),
    );
  };

  return (
    <Grid flex={1} container justifyContent="flex-end" alignItems="center" columnSpacing={1}>
      {typeTab === 'function' && (
        <>
          <Grid item>
            <LoadingButton
              disabled={roleInfo.builtIn}
              variant="text"
              startIcon={<DeleteOutlined />}
              onClick={handleOpenModalDelete}
            >
              Xóa
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              form="update_role"
              loading={false}
              disabled={roleInfo.builtIn}
              variant="text"
              startIcon={<SaveOutlined />}
            >
              Lưu
            </LoadingButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default RoleDetailAction;
