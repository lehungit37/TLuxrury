import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormDatePicker, FormInput, FormSelect } from 'src/components/hook_form';
import Loading from 'src/components/loading';
import { CModalIds } from 'src/constants';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { getRoomsShow } from 'src/redux_store/room/room_actions';
import {
  checkCanCreateBooking,
  createBooking,
} from 'src/redux_store/room_booking/room_booking_actions';
import { IRoom } from 'src/types/room';
import { IRoomBooking } from 'src/types/roomBooking';
import { toastMessage } from 'src/utils/toast';
import { isValidPhoneNumber } from 'src/utils/validation';
import * as yup from 'yup';

type Props = {
  handleChangeStep: (newStep: number) => void;
  roomWillBooking: { roomId: string; fromDate: Date; toDate: Date };
  asyncGetData: () => void;
};

const schema = yup.object({
  customerName: yup.string().required('Vui lòng nhập tên khách hàng'),
  customerPhone: yup.string().required('Vui lòng nhập SDT'),
  roomId: yup.string().required('Vui lòng chọn phòng'),
});

const Step2Booking = (props: Props) => {
  const { handleChangeStep, asyncGetData, roomWillBooking } = props;
  const dispatch = useAppDispatch();
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  useEffect(() => {
    dispatch(getRoomsShow({ status: '', roomTypeId: '' }))
      .unwrap()
      .then((data) => setRoomList(data));
  }, []);

  const isLoading = useIsRequestPending('rooms', 'getRoomsShow');
  const isLoadingBooking = useIsRequestPending('rooms', 'createBooking');
  const isLoaingCheckBooking = useIsRequestPending('rooms', 'checkCanCreateBooking');

  const { control, handleSubmit, setError } = useForm<IRoomBooking>({
    defaultValues: {
      customerName: '',
      customerPhone: '',
      roomId: roomWillBooking.roomId,
      fromDate: roomWillBooking.fromDate,
      toDate: roomWillBooking.toDate,
    },

    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IRoomBooking) => {
    if (!isValidPhoneNumber(data.customerPhone)) {
      setError('customerPhone', { message: 'Số điện thoại không đúngg địng dạng' });
      return;
    }

    if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
      setError('fromDate', { message: 'Thời gian bắt đầu phải bé hơn thời gian kết thúc' });
      setError('toDate', { message: 'Thời gian bắt đầu phải bé hơn thời gian kết thúc' });
      return;
    }

    dispatch(
      checkCanCreateBooking({ fromDate: data.fromDate, toDate: data.toDate, roomId: data.roomId }),
    )
      .unwrap()
      .then((isCanCreate) => {
        if (isCanCreate) {
          dispatch(createBooking(data))
            .unwrap()
            .then(() => {
              asyncGetData();
              toastMessage.success('Đặt phòng thành công');
              dispatch(closeModal({ modalId: CModalIds.addBooking }));
            })
            .catch((error) => {
              toastMessage.error(error.message || 'Đặt phòng thất bại');
            });
        } else {
          toastMessage.error(
            'Phòng đã có lịch đặt vào thời gian trên, vui lòng chọn thời gian khác',
          );
        }
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={1}
      component="form"
      height="100%"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <Box flex={1}>
        {isLoading ? (
          <Loading />
        ) : (
          <Grid container flexDirection="column">
            <Grid item>
              <FormInput control={control} name="customerName" label="Tên khách hàng" />
            </Grid>
            <Grid item>
              <FormInput control={control} name="customerPhone" label="Số điện thoại" />
            </Grid>
            <Grid item>
              <FormSelect
                control={control}
                name="roomId"
                label="Phòng"
                keyOption="id"
                labelOption="name"
                options={roomList}
                disabled
              />
            </Grid>
            <Grid item>
              <FormDatePicker
                disabled
                control={control}
                name="fromDate"
                label="Thời gian nhận phòng"
              />
            </Grid>
            <Grid item>
              <FormDatePicker
                disabled
                control={control}
                name="toDate"
                label="Thời gian trả phòng"
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <Box>
        <Grid container justifyContent="flex-end" columnSpacing={1}>
          <Grid item>
            <Button onClick={() => handleChangeStep(1 - 1)} variant="outlined">
              Quay lại
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              loading={isLoadingBooking || isLoaingCheckBooking}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Đặt phòng
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Step2Booking;
