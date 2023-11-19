import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormSelect } from 'src/components/hook_form';
import { useAppDispatch } from 'src/hooks';
import { getRoomTypes } from 'src/redux_store/room/room_actions';
import { ERoomStatus, IRoomType } from 'src/types/room';

const STATUS_OPTIONS: { id: string; name: string }[] = [
  { id: 'all', name: 'Tất cả' },
  { id: ERoomStatus.FREE, name: 'Đang rảnh' },
  { id: ERoomStatus.WORKING, name: 'Đang sử dụng' },
  { id: ERoomStatus.UPDATING, name: 'Đang bảo trì' },
];

type Props = {
  handleChangePayload: (name: string, value: string) => void;
};

const Filter = ({ handleChangePayload }: Props) => {
  const [roomTypeList, setRoomTypeList] = useState<IRoomType[]>([{ id: 'all', name: 'Tất cả' }]);

  const { control } = useForm({
    defaultValues: {
      roomTypeId: 'all',
      status: 'all',
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRoomTypes())
      .unwrap()
      .then((data) => {
        setRoomTypeList(roomTypeList.concat(data));
      });
  }, []);

  const handleChangeSelect = (name: string, value: any) => {
    let newValue = value;

    if (value === 'all') newValue = '';

    handleChangePayload(name, newValue);
  };
  return (
    <Grid container padding={1} columnSpacing={1} sx={{ width: '100%', background: '#ffffff' }}>
      <Grid item md={2}>
        <FormSelect
          control={control}
          name="status"
          label="Trạng thái"
          options={STATUS_OPTIONS}
          keyOption="id"
          labelOption="name"
          handleChange={handleChangeSelect}
        />
      </Grid>
      <Grid item md={2}>
        <FormSelect
          control={control}
          name="roomTypeId"
          label="Loại phòng"
          options={roomTypeList}
          keyOption="id"
          labelOption="name"
          handleChange={handleChangeSelect}
        />
      </Grid>
    </Grid>
  );
};

export default Filter;
