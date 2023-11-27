import {
  AccessTimeOutlined,
  DeleteOutlined,
  LocalPhone,
  LocalPhoneOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import ConfirmationDialog from 'src/components/modal/confirm_dialog';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { closeModal, openModal } from 'src/redux_store/common/modal_slice';
import { deleteRoomBooking } from 'src/redux_store/room_booking/room_booking_actions';
import theme from 'src/theme';
import { toastMessage } from 'src/utils/toast';

type Props = {
  data: any;
  onDeleteSuccess: (bookingId: string) => void;
};

const RoomBookingInfo = ({ data, onDeleteSuccess }: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteBooking = () => {
    dispatch(deleteRoomBooking(data.id))
      .unwrap()
      .then(() => {
        toastMessage.success('Xoá đặt phòng thành công');

        onDeleteSuccess(data.id);
        dispatch(
          closeModal({
            modalId: 'deleteBooking',
          }),
        );

        dispatch(
          closeModal({
            modalId: CModalIds.update_booking,
          }),
        );
      })
      .catch((error) => {
        toastMessage.error(error.message || 'Xoá đặt phòng thành công');
      });
  };

  const handleOpenModalDeleteBooking = () => {
    dispatch(
      openModal({
        modalId: 'deleteBooking',
        modalComponent: (
          <ConfirmationDialog
            modalId="deleteBooking"
            describe="Bạn có muốn xoá lượt đặt phòng này không ?"
            sliceName="rooms"
            functionName="deleteBooking"
            callback={handleDeleteBooking}
          />
        ),
      }),
    );
  };

  return (
    <DialogWrapper modalId={CModalIds.update_booking}>
      <Box p={3}>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              mr: 2,
              mt: 1,
            }}
          ></Box>

          <Box>
            <Typography fontWeight="bold" variant="h4">
              {data.title}
            </Typography>
            <Typography fontWeight="bold">{data.customerPhone}</Typography>
          </Box>
        </Box>
        <Box display={'flex'} sx={{ alignItems: 'center' }} mt={1}>
          <Box
            sx={{
              width: '30px',
              height: '30px',
              mr: 2,
            }}
          >
            <LoginOutlined />
          </Box>
          <Box>
            <Typography fontWeight="bold">
              Nhận phòng: {moment(data.startDate).format('YYYY-MM-DD HH:mm')}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} sx={{ alignItems: 'center' }} mt={1}>
          <Box
            sx={{
              width: '30px',
              height: '30px',
              mr: 2,
            }}
          >
            <LogoutOutlined />
          </Box>
          <Box>
            <Typography fontWeight="bold">
              Trả phòng: {moment(data.endDate).format('YYYY-MM-DD HH:mm')}
            </Typography>
          </Box>
        </Box>

        <Grid container columnSpacing={1} mt={3}>
          <Grid item>
            <LoadingButton startIcon={<LoginOutlined />} variant="contained">
              Nhận phòng
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              onClick={handleOpenModalDeleteBooking}
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlined />}
            >
              Xoá đặt phòng
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
};

export default RoomBookingInfo;
