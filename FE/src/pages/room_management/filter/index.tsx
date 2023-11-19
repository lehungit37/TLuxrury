import { AddOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSelect } from 'src/components/hook_form';
import { CModalIds } from 'src/constants';
import { useAppDispatch, useAppSelector, useDelayTimeout } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal_slice';
import { getRoomTypes } from 'src/redux_store/room/room_actions';
import { changePayloadGetRoom } from 'src/redux_store/room/room_slice';
import { IRoomType } from 'src/types/room';
import ModalAddRoom from '../modal_add_room';

function RoomFilter() {
  const dispatch = useAppDispatch();
  const { control } = useForm({
    defaultValues: {
      roomType: 'all',
    },
  });

  const timer = useDelayTimeout(500);

  const { payload } = useAppSelector((state) => state.roomSlice);

  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([{ id: 'all', name: 'Tất cả' }]);

  useEffect(() => {
    dispatch(getRoomTypes())
      .unwrap()
      .then((data) => {
        setRoomTypes(roomTypes.concat(data));
      });
  }, []);

  const handleChangeRoomType = (name: string, value: string) => {
    let roomType = value;
    if (value === 'all') roomType = '';

    dispatch(changePayloadGetRoom({ ...payload, roomTypeId: roomType }));
  };

  const handleOpenModalAddRoom = () => {
    dispatch(
      openModal({
        modalId: CModalIds.addRoom,
        modalComponent: <ModalAddRoom />,
      }),
    );
  };

  const handleChangeKeyword = (name: string, value: string) => {
    timer(() => {
      dispatch(changePayloadGetRoom({ ...payload, searchKeyword: value }));
    });
  };

  return (
    <Grid container justifyContent={'space-between'} alignItems="center">
      <Grid item flex={1}>
        <Grid container columnSpacing={1}>
          <Grid item md={2}>
            <FormInput
              control={control}
              name="searchKeyword"
              label="Tên phòng"
              handleChange={handleChangeKeyword}
            />
          </Grid>
          <Grid item md={2}>
            <FormSelect
              control={control}
              name="roomType"
              options={roomTypes}
              keyOption="id"
              label="Loại phòng"
              labelOption="name"
              handleChange={handleChangeRoomType}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={handleOpenModalAddRoom} variant="outlined" startIcon={<AddOutlined />}>
          Thêm phòng
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomFilter;
