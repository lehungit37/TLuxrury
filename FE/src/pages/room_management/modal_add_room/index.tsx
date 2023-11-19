import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { useStyles } from './styles';
import * as yup from 'yup';
import { IRoomType } from 'src/types/room';
import { addRoom, getRoomManagement, getRoomTypes } from 'src/redux_store/room/room_actions';
import { FormInput, FormSelect } from 'src/components/hook_form';
import Scrollbars from 'react-custom-scrollbars-2';
import { FormCheckbox } from 'src/components/hook_form/form_checkbox';
import { yupResolver } from '@hookform/resolvers/yup';
import { toastMessage } from 'src/utils/toast';

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

function ModalAddRoom() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);

  const { payload } = useAppSelector((state) => state.roomSlice);

  const { handleSubmit, control, setValue, setError } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      roomTypeId: '',
      bed: {
        amount: 0,
        type: BED_TYPE_OPTIONS[0].id,
      },
      television: {
        status: false,
        description: '',
      },
      promotion: 0,
      description: '',
    },
    resolver: yupResolver(scheme),
  });

  useEffect(() => {
    dispatch(getRoomTypes())
      .unwrap()
      .then((data) => {
        setRoomTypes(data);
        if (data.length) {
          setValue('roomTypeId', data[0].id);
        }
      });
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModal({ modalId: CModalIds.addRoom }));
  };
  const onSubmit = (data: any) => {
    dispatch(addRoom(data))
      .unwrap()
      .then(() => {
        toastMessage.success('Thêm phòng thành công');
        dispatch(getRoomManagement(payload));
        handleCloseModal();
      })
      .catch((error) => {
        toastMessage.setErrors(error.errors, setError);
      });
  };

  return (
    <DialogWrapper
      isNotAutoClose
      maxWidthDialog="lg"
      classNames={classes.root}
      modalId={CModalIds.addRoom}
    >
      <Box className={classes.form}>
        <Typography variant="h5" textAlign="center">
          Thêm phòng
        </Typography>

        <Box flex={1}>
          <Scrollbars>
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
                <FormInput control={control} name="promotion" label="Khuyến mãi" type="number" />
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
                        <FormCheckbox control={control} name="television.status" label="Cung cấp" />
                      </Grid>
                      <Grid item md={12}>
                        <FormInput name="television.description" label="Mô tả" control={control} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Scrollbars>
        </Box>

        <Grid container columnSpacing={1} justifyContent="flex-end">
          <Grid item>
            <Button onClick={handleCloseModal} variant="outlined">
              Hủy bỏ
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton onClick={handleSubmit(onSubmit)} variant="contained">
              Thêm mới
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
}

export default ModalAddRoom;
