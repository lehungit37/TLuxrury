import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormInput } from 'src/components/hook_form';
import Loading from 'src/components/loading';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants';
import { useAppDispatch, useIsRequestPending } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { createPayment, invoicePaided, updateRoom } from 'src/redux_store/room/room_actions';
import { ERoomStatus, IRoom } from 'src/types/room';
import { formatDate, formatNumberToVND } from 'src/utils/function';
import { toastMessage } from 'src/utils/toast';

type Props = {
  room: IRoom;
};

const ModalPayment = (props: Props) => {
  const { room } = props;

  const dispatch = useAppDispatch();
  const isLoading = useIsRequestPending('room', 'createPayment');

  const [isLoaingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    dispatch(createPayment(room.id))
      .unwrap()
      .then((value) => {
        setData(value);
      });
  }, []);

  const handlePaided = () => {
    setIsLoadingUpdate(true);
    dispatch(invoicePaided(data.id))
      .unwrap()
      .then(() => {
        dispatch(updateRoom({ roomId: room.id, newRoom: { ...room, status: ERoomStatus.FREE } }))
          .unwrap()
          .then(() => {
            setIsLoadingUpdate(false);
            dispatch(closeModal({ modalId: CModalIds.getPaymentInfo }));
            toastMessage.success('Khách trả phòng thành công');
          })
          .catch(() => {
            toastMessage.error('Khách trả phòng thất bại');
          });
      });
  };

  const renderItem = () => {
    const list = [
      { title: 'Tên khách hàng', value: data.customerName },
      { title: 'Số điện thoại', value: data.customerPhone },
      { title: 'Thời gian nhận phòng', value: formatDate(data.startDate) },
      { title: 'Thời gian trả phòng', value: formatDate(data.endDate) },
    ];

    return list.map((item, index) => {
      return (
        <Grid container mb={1} key={index} columnSpacing={1}>
          <Grid item md={5}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.title}:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'subtitle1'}>{item.value}</Typography>
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <DialogWrapper
      sx={{ height: '100%' }}
      minWidth={480}
      modalId={CModalIds.getPaymentInfo}
      isFullHeight
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 1 }}>
        <Box>
          <Typography textAlign="center" variant="h5" fontWeight="bold">
            Khách trả phòng
          </Typography>
          <Typography textAlign="center" variant="subtitle1" fontWeight="bold">
            {room.name}
          </Typography>
        </Box>
        <Divider />

        <Box flex={1} py={2}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {renderItem()}
              <Divider />

              <Grid container my={1} columnSpacing={1}>
                <Grid item md={5}>
                  <Typography variant="h5" fontWeight="bold">
                    Số tiền
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" fontWeight="bold">
                    {formatNumberToVND(data.amount || 0)}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Box>

        <Grid container justifyContent="flex-end" columnSpacing={1}>
          <Grid item>
            <Button
              onClick={() => {
                dispatch(closeModal({ modalId: CModalIds.getPaymentInfo }));
              }}
              variant="outlined"
            >
              Đóng
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton loading={isLoaingUpdate} onClick={handlePaided} variant="contained">
              Đã nhận tiền
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
};

export default ModalPayment;
