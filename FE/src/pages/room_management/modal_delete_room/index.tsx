import React from 'react';
import ConfirmationDialog from 'src/components/modal/confirm_dialog';
import { CModalIds } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { toastMessage } from 'src/redux_store/common/toast/toast_action';
import { deleteRoom } from 'src/redux_store/room/room_actions';

function ModalDeleteRoom() {
  const dispatch = useAppDispatch();
  const { roomIdSelected } = useAppSelector((state) => state.roomSlice);

  const handleDelete = () => {
    if (!roomIdSelected) return;
    dispatch(deleteRoom(roomIdSelected))
      .unwrap()
      .then(() => {
        toastMessage.success('Xoá phòng thành công');
        dispatch(closeModal({ modalId: CModalIds.deleteRoom }));
      })
      .catch(() => {
        toastMessage.error('Xoá phòng thất bại');
      });
  };

  return (
    <ConfirmationDialog
      modalId={CModalIds.deleteRoom}
      describe="Bạn có muốn xóa phòng này không?"
      sliceName="room"
      functionName="deleteRoom"
      callback={handleDelete}
      okLabel="Đồng ý"
      cancelLabel="Huỷ"
    />
  );
}

export default ModalDeleteRoom;
