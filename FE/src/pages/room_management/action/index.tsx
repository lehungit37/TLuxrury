import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { CModalIds } from 'src/constants';
import { useAppDispatch, useIsRequestPending } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal_slice';
import ModalDeleteRoom from '../modal_delete_room';

function RoomAction() {
  const dispatch = useAppDispatch();

  const isLoadingUpdateUser = useIsRequestPending('room', 'updateRoom');

  const handleDeleteRoom = () => {
    dispatch(openModal({ modalId: CModalIds.deleteRoom, modalComponent: <ModalDeleteRoom /> }));
  };

  return (
    <Grid container justifyContent="flex-end" columnSpacing={2}>
      <Grid item>
        <Button startIcon={<DeleteOutline />} onClick={handleDeleteRoom} color="secondary">
          Xoá phòng
        </Button>
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          form="update_room"
          color="secondary"
          startIcon={<SaveOutlined />}
          loading={isLoadingUpdateUser}
        >
          Lưu
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default RoomAction;
