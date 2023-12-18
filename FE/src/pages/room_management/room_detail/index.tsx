import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useForm } from 'react-hook-form';
import { FormInput, FormSelect } from 'src/components/hook_form';
import { FormCheckbox } from 'src/components/hook_form/form_checkbox';
import Loading from 'src/components/loading';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import {
  getRoomDetail,
  getRoomManagement,
  getRoomTypes,
  updateRoom,
} from 'src/redux_store/room/room_actions';
import { IRoom, IRoomType } from 'src/types/room';
import { toastMessage } from 'src/utils/toast';
import * as yup from 'yup';

const BED_TYPE_OPTIONS = [
  { id: 'single', name: 'Giường đơn' },
  { id: 'double', name: 'Giường đôi' },
];

const scheme = yup.object({
  name: yup.string().required('Vui lòng nhập tên phòng'),
  price: yup.number().min(1, 'Giá phòng phải > 0').required('Vui lòng nhập giá phòng'),
  roomTypeId: yup.string().required('Vui lòng chọn loại phòng'),
  bed: yup.object({
    amount: yup.number().required('Vui lòng nhập số lượng giường'),
  }),
  promotion: yup.number().min(0, 'Khuyến mãi phải >= 0'),
});

function RoomDetail() {
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const { room, roomIdSelected, payload } = useAppSelector((state) => state.roomSlice);

  const loadingGetRoomType = useIsRequestPending('room', 'getRoomTypes');
  const loadingGetRoomDetail = useIsRequestPending('room', 'getRoomDetail');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (roomIdSelected) {
      dispatch(getRoomTypes())
        .unwrap()
        .then((data) => {
          setRoomTypes(data);
        });
    }
  }, []);

  useEffect(() => {
    if (roomIdSelected) {
      dispatch(getRoomDetail(roomIdSelected));
    }
  }, [roomIdSelected]);
  useEffect(() => {
    reset(room);
  }, [room]);

  const { control, reset, handleSubmit, setError } = useForm({
    defaultValues: room,
    resolver: yupResolver(scheme),
  });

  const onSubmit = (data: IRoom) => {
    dispatch(updateRoom({ roomId: roomIdSelected, newRoom: data }))
      .unwrap()
      .then(() => {
        toastMessage.success('Cập nhật phòng thành công');
        dispatch(getRoomManagement(payload));
      })
      .catch((error) => {
        if (!_.isEmpty(error.errors)) {
          toastMessage.setErrors(error, setError);
          return;
        }

        toastMessage.error(error.message || 'Cập nhật phòng thất bại');
      });
  };

  return (
    <Box sx={{ width: '100%', height: '100%', background: '#fff' }}>
      <Scrollbars>
        <Box p={2}>
          {loadingGetRoomDetail || loadingGetRoomType ? (
            <Box display="flex" justifyContent="center">
              <Loading />
            </Box>
          ) : (
            <>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} id="update_room">
                <Typography fontWeight={600}>Thông tin cơ bản</Typography>
                <Grid px={2} height="100%" container spacing={1}>
                  <Grid item md={12}>
                    <FormInput control={control} name="name" label="Tên phòng" />
                  </Grid>
                  <Grid item md={12}>
                    <FormInput type="number" control={control} name="price" label="Giá phòng" />
                  </Grid>
                  <Grid item md={12}>
                    <FormSelect
                      control={control}
                      name="roomTypeId"
                      label="Loại phòng"
                      labelOption="name"
                      options={roomTypes}
                      keyOption={'id'}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <FormInput
                      control={control}
                      name="promotion"
                      label="Khuyến mãi"
                      type="number"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <FormInput control={control} name="description" label="Mô tả" />
                  </Grid>

                  <Grid item md={12}>
                    <Typography fontWeight={600}>Tiện ích</Typography>
                    <Grid container flexDirection="column">
                      <Grid item p={2}>
                        <Typography mb={1} fontWeight={600}>
                          Giường
                        </Typography>
                        <Grid container width="100%">
                          <Grid item md={12}>
                            <FormSelect
                              name="bed.type"
                              options={BED_TYPE_OPTIONS}
                              label="Loại giường"
                              labelOption="name"
                              keyOption="id"
                              control={control}
                            />
                          </Grid>
                          <Grid item md={12}>
                            <FormInput
                              type="number"
                              name="bed.amount"
                              label="Số lượng giường"
                              control={control}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item p={2}>
                        <Typography fontWeight={600}>Tivi</Typography>
                        <Grid container width="100%">
                          <Grid item md={12}>
                            <FormCheckbox
                              control={control}
                              name="television.status"
                              label="Cung cấp"
                            />
                          </Grid>
                          <Grid item md={12}>
                            <FormInput
                              name="television.description"
                              label="Mô tả"
                              control={control}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Scrollbars>
    </Box>
  );
}

export default RoomDetail;
