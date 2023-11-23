import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/components/hook_form';
import { FormDateTimePicker } from 'src/components/hook_form/form_datetimepicker';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { createInvoice, updateRoom } from 'src/redux_store/room/room_actions';
import { ERoomStatus, IRoom } from 'src/types/room';
import { toastMessage } from 'src/utils/toast';
import { isValidPhoneNumber } from 'src/utils/validation';
import * as yup from 'yup';

type Props = {
  room: IRoom;
};

const schema = yup.object({
  customerName: yup.string().required('Vui lòng nhập tên khách hàng'),
});

function ModalUsingRoom(props: Props) {
  const { room } = props;
  const dispatch = useAppDispatch();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      customerName: '',
      customerPhone: '',
      startDate: new Date(),
      roomId: room.id,
    },

    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (data.customerPhone && !isValidPhoneNumber(data.customerPhone)) {
      setError('customerPhone', { message: 'Số điện thoại không đúng định dạng' });
      return;
    }

    setIsLoadingUpdate(true);
    dispatch(createInvoice(data))
      .unwrap()
      .then(() => {
        dispatch(updateRoom({ roomId: room.id, newRoom: { ...room, status: ERoomStatus.WORKING } }))
          .unwrap()
          .then(() => {
            dispatch(closeModal({ modalId: CModalIds.usingRoom }));
            toastMessage.success('Khách nhận phòng thành công');
          })
          .catch(() => {
            toastMessage.error('Khách nhận phòng thất bại');
          });
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });
  };

  return (
    <DialogWrapper
      sx={{ height: '100%' }}
      minWidth={480}
      modalId={CModalIds.usingRoom}
      isFullHeight
    >
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 1 }}
      >
        <Box>
          <Typography textAlign="center" variant="h5" fontWeight="bold">
            Khách nhận phòng
          </Typography>
          <Typography textAlign="center" variant="subtitle1" fontWeight="bold">
            {room.name}
          </Typography>
        </Box>
        <Divider />

        <Box flex={1}>
          <Grid container flexDirection="column">
            <Grid item>
              <FormInput name="customerName" label="Tên khách hàng" control={control} />
            </Grid>
            <Grid item>
              <FormInput name="customerPhone" label="Số điện thoại" control={control} />
            </Grid>

            <Grid item>
              <FormDateTimePicker
                disabled
                control={control}
                name="startDate"
                label="Thời gian nhận phòng"
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container justifyContent="flex-end" columnSpacing={1}>
          <Grid item>
            <Button
              onClick={() => {
                dispatch(closeModal({ modalId: CModalIds.usingRoom }));
              }}
              variant="outlined"
            >
              Huỷ bỏ
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              onClick={handleSubmit(onSubmit)}
              loading={isLoadingUpdate}
              variant="contained"
            >
              Nhận phòng
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
}

export default ModalUsingRoom;
